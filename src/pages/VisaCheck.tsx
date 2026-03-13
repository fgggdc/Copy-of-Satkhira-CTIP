import { useState, useRef } from "react";
import { Search, Globe, FileText, Loader2, Info, Upload, CheckCircle2, XCircle, AlertTriangle, File as FileIcon, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

export default function VisaCheck() {
  const [activeTab, setActiveTab] = useState<"search" | "verify">("search");

  // Search State
  const [country, setCountry] = useState("");
  const [visaType, setVisaType] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // Verify State
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!country.trim() || !visaType.trim()) return;

    setIsSearching(true);
    setSearchResult(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Provide 100% accurate, up-to-date information in Bengali about the "${visaType}" visa for "${country}" for a Bangladeshi citizen. Use Google Search to find the latest official rules. Include:
      1. Visa Type Description
      2. Required Documents (প্রয়োজনীয় কাগজপত্র)
      3. Estimated Processing Time (আনুমানিক সময়)
      4. Estimated Fees (আনুমানিক ফি)
      5. Important Warnings/Scam Alerts (সতর্কতা)
      6. Official Website Link (অফিসিয়াল ওয়েবসাইট)
      Format the response nicely in Markdown.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are a highly accurate visa and immigration expert for Bangladeshi citizens. You must provide 100% accurate, up-to-date, and safe information. Always answer in Bengali.",
          tools: [{ googleSearch: {} }],
          temperature: 0.2,
        },
      });

      setSearchResult(response.text || "দুঃখিত, কোনো তথ্য পাওয়া যায়নি।");
    } catch (error: any) {
      console.error("Visa check error:", error);
      setSearchResult(`দুঃখিত, একটি প্রযুক্তিগত সমস্যা হয়েছে: ${error?.message || "Unknown error"}। অনুগ্রহ করে আবার চেষ্টা করুন।`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) processFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) processFile(droppedFile);
  };

  const processFile = (file: File) => {
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    setVerifyResult(null);
  };

  const handleVerify = async () => {
    if (!file || !previewUrl) return;

    setIsVerifying(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      const base64Data = previewUrl.split(",")[1];
      const mimeType = file.type;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: 'Perform a 100% rigorous, deterministic, and highly accurate analysis of this visa document (image or PDF). Check for any inconsistencies, font mismatches, incorrect MRZ formatting, or signs of forgery. Extract key information: Holder\'s Name, Visa Type, Expiry Date, Passport Number, Country. Use Google Search to find the exact official government website link to verify this specific country\'s visa online. Respond in Bengali in JSON format with keys: "isAuthentic" (boolean), "documentType" (string), "extractedInfo" (object with key-value pairs in Bengali), "warnings" (array of strings in Bengali detailing any suspicious elements), "officialVerificationLink" (string, URL only or null), "confidence" (number 0-100). Do not guess. If information is missing, state it clearly.',
            },
          ],
        },
        config: {
          responseMimeType: "application/json",
          tools: [{ googleSearch: {} }],
          temperature: 0.1,
        },
      });

      const jsonStr = response.text?.trim() || "{}";
      const parsedResult = JSON.parse(jsonStr);
      setVerifyResult(parsedResult);
    } catch (error) {
      console.error("Verification error:", error);
      setVerifyResult({
        isAuthentic: false,
        documentType: "অজানা",
        extractedInfo: {},
        warnings: [
          "যাচাইকরণ প্রক্রিয়ায় একটি ত্রুটি হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        ],
        confidence: 0,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center p-4 bg-emerald-500/10 rounded-full mb-6"
        >
          <Search className="w-12 h-12 text-emerald-500" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-bold mb-4"
        >
          ভিসা চেক ও যাচাই
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          ভিসার তথ্য খুঁজুন অথবা আপনার ভিসার কপি আপলোড করে এআই-এর মাধ্যমে সত্যতা যাচাই করুন।
        </motion.p>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("search")}
          className={`px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === "search"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          ভিসার তথ্য খুঁজুন
        </button>
        <button
          onClick={() => setActiveTab("verify")}
          className={`px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === "verify"
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          ভিসা যাচাই করুন
        </button>
      </div>

      {activeTab === "search" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-12 gap-8"
        >
          <div className="md:col-span-5">
            <div className="brutal bg-card p-6 rounded-2xl border-2 border-border shadow-lg">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                ভিসার তথ্য খুঁজুন
              </h2>
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">দেশের নাম</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="যেমন: সৌদি আরব, মালয়েশিয়া, দুবাই"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">ভিসার ধরন</label>
                  <input
                    type="text"
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    placeholder="যেমন: ওয়ার্ক ভিসা, ভিজিট ভিসা, স্টুডেন্ট ভিসা"
                    className="w-full p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSearching || !country.trim() || !visaType.trim()}
                  className="w-full py-3 px-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
                >
                  {isSearching ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      তথ্য খোঁজা হচ্ছে...
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5" />
                      ভিসার তথ্য দেখুন
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="md:col-span-7">
            {searchResult ? (
              <div className="brutal bg-card p-6 rounded-2xl border-2 border-border shadow-lg h-full">
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-border">
                  <Info className="w-6 h-6 text-emerald-500" />
                  <h2 className="text-xl font-bold">ভিসার বিস্তারিত তথ্য</h2>
                </div>
                <div className="markdown-body prose prose-base dark:prose-invert max-w-none">
                  <Markdown>{searchResult}</Markdown>
                </div>
              </div>
            ) : (
              <div className="brutal bg-muted/30 p-8 rounded-2xl border-2 border-dashed border-border h-full flex flex-col items-center justify-center text-center min-h-[300px]">
                <FileText className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-bold text-muted-foreground mb-2">কোনো তথ্য নির্বাচন করা হয়নি</h3>
                <p className="text-muted-foreground/80 max-w-sm">
                  বাম পাশের ফর্মে দেশের নাম এবং ভিসার ধরন লিখে "ভিসার তথ্য দেখুন" বাটনে ক্লিক করুন।
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {activeTab === "verify" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <div className="space-y-6">
            <div
              className={`brutal border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
                previewUrl ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/50"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*,application/pdf"
                className="hidden"
              />
              
              {previewUrl ? (
                <div className="space-y-4">
                  {file?.type.startsWith("image/") ? (
                    <img
                      src={previewUrl}
                      alt="Document preview"
                      className="max-h-64 mx-auto rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="w-full h-64 flex flex-col items-center justify-center bg-muted rounded-lg">
                      <FileIcon className="w-16 h-16 text-muted-foreground mb-4" />
                      <span className="font-medium">{file?.name}</span>
                    </div>
                  )}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl(null);
                        setVerifyResult(null);
                      }}
                      className="px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      মুছে ফেলুন
                    </button>
                    <button
                      onClick={handleVerify}
                      disabled={isVerifying}
                      className="px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          যাচাই করা হচ্ছে...
                        </>
                      ) : (
                        <>
                          <Search className="w-4 h-4" />
                          যাচাই করুন
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-12">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Upload className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">ভিসার কপি আপলোড করুন</h3>
                  <p className="text-muted-foreground mb-6">
                    আপনার ভিসার ছবি (JPG, PNG) বা PDF ফাইল এখানে টেনে আনুন অথবা ক্লিক করে নির্বাচন করুন
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    ফাইল নির্বাচন করুন
                  </button>
                </div>
              )}
            </div>
            
            <div className="brutal bg-amber-500/10 border-2 border-amber-500/20 rounded-2xl p-6">
              <h3 className="font-bold flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                <AlertTriangle className="w-5 h-5" />
                সতর্কতা ও ১০০% যাচাইকরণ
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300">
                এআই সর্বোচ্চ নির্ভুলতার সাথে ডকুমেন্টটি বিশ্লেষণ করে। তবে ১০০% আইনি ও চূড়ান্ত নিশ্চয়তার জন্য, অনুগ্রহ করে ফলাফলে দেওয়া <strong>অফিসিয়াল যাচাইকরণ লিংক</strong> ব্যবহার করে সংশ্লিষ্ট দেশের সরকারি পোর্টালে আপনার ভিসাটি চেক করে নিন।
              </p>
            </div>
          </div>

          <div>
            {isVerifying ? (
              <div className="brutal bg-card p-8 rounded-2xl border-2 border-border shadow-lg h-full flex flex-col items-center justify-center text-center">
                <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
                <h3 className="text-2xl font-bold mb-2">এআই যাচাই করছে...</h3>
                <p className="text-muted-foreground">
                  আপনার আপলোড করা ভিসাটি বিশ্লেষণ করা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।
                </p>
              </div>
            ) : verifyResult ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="brutal bg-card p-6 rounded-2xl border-2 border-border shadow-lg h-full"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  {verifyResult.isAuthentic ? (
                    <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center shrink-0">
                      <XCircle className="w-8 h-8 text-red-500" />
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold mb-1">
                      {verifyResult.isAuthentic ? "প্রাথমিকভাবে সঠিক" : "সন্দেহজনক"}
                    </h2>
                    <p className="text-muted-foreground">
                      এআই কনফিডেন্স: <span className="font-bold text-foreground">{verifyResult.confidence}%</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                      ভিসার ধরন
                    </h3>
                    <p className="text-lg font-medium">{verifyResult.documentType}</p>
                  </div>

                  {Object.keys(verifyResult.extractedInfo || {}).length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">
                        প্রাপ্ত তথ্য
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(verifyResult.extractedInfo).map(([key, value]) => (
                          <div key={key} className="bg-muted/50 p-3 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-1">{key}</p>
                            <p className="font-medium">{value as string}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {verifyResult.warnings && verifyResult.warnings.length > 0 && (
                    <div>
                      <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        সতর্কতা ও ত্রুটি
                      </h3>
                      <ul className="space-y-2">
                        {verifyResult.warnings.map((warning: string, index: number) => (
                          <li key={index} className="flex items-start gap-2 text-sm bg-red-500/10 text-red-600 dark:text-red-400 p-3 rounded-lg">
                            <span className="mt-0.5">•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {verifyResult.officialVerificationLink && (
                    <div>
                      <h3 className="text-sm font-bold text-blue-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        অফিসিয়াল যাচাইকরণ লিংক
                      </h3>
                      <a
                        href={verifyResult.officialVerificationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm bg-blue-500/10 text-blue-600 dark:text-blue-400 p-3 rounded-lg hover:bg-blue-500/20 transition-colors break-all"
                      >
                        <ExternalLink className="w-4 h-4 shrink-0" />
                        <span>{verifyResult.officialVerificationLink}</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="brutal bg-muted/30 p-8 rounded-2xl border-2 border-dashed border-border h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                <FileText className="w-16 h-16 text-muted-foreground/50 mb-4" />
                <h3 className="text-xl font-bold text-muted-foreground mb-2">ফলাফল এখানে প্রদর্শিত হবে</h3>
                <p className="text-muted-foreground/80 max-w-sm">
                  আপনার ভিসার কপি আপলোড করে "যাচাই করুন" বাটনে ক্লিক করলে এআই-এর বিশ্লেষণ এখানে দেখতে পাবেন।
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
