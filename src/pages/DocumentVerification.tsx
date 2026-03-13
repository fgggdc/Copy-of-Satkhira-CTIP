import { useState, useRef } from "react";
import {
  Upload,
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { motion } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import FeedbackRating from "../components/FeedbackRating";

export default function DocumentVerification() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setResult(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith("image/")) {
      setFile(droppedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(droppedFile);
      setResult(null);
    }
  };

  const handleVerify = async () => {
    if (!file || !previewUrl) return;

    setIsVerifying(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

      // Extract base64 data
      const base64Data = previewUrl.split(",")[1];
      const mimeType = file.type;

      const response = await ai.models.generateContent({
        model: "gemini-flash-latest",
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: mimeType,
              },
            },
            {
              text: 'Analyze this document (passport, visa, or contract). Is it likely authentic? What type of document is it? Extract key information (Name, ID, Expiry Date). Respond in Bengali in JSON format with keys: "isAuthentic" (boolean), "documentType" (string), "extractedInfo" (object with key-value pairs), "warnings" (array of strings), "confidence" (number 0-100).',
            },
          ],
        },
        config: {
          responseMimeType: "application/json",
        },
      });

      const jsonStr = response.text?.trim() || "{}";
      const parsedResult = JSON.parse(jsonStr);
      setResult(parsedResult);
    } catch (error) {
      console.error("Verification error:", error);
      setResult({
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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">ডকুমেন্ট যাচাই</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          আপনার পাসপোর্ট, শিক্ষাগত সনদ, বা চাকরির চুক্তিপত্রের ছবি আপলোড করে
          এআই-এর মাধ্যমে প্রাথমিক সত্যতা যাচাই করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div
            className={`brutal border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
              previewUrl
                ? "bg-muted/50 border-primary/50"
                : "bg-card border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {previewUrl ? (
              <div className="relative aspect-[3/4] w-full max-w-xs mx-auto overflow-hidden rounded-xl border border-border">
                <img
                  src={previewUrl}
                  alt="Document Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <p className="text-white font-medium flex items-center gap-2">
                    <Upload className="w-5 h-5" /> পরিবর্তন করুন
                  </p>
                </div>
              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-muted-foreground">
                <Upload className="w-12 h-12 mb-4 text-primary/50" />
                <p className="text-lg font-medium mb-2 text-foreground">
                  ছবি আপলোড করুন
                </p>
                <p className="text-sm mb-4">বা এখানে টেনে আনুন (Drag & Drop)</p>
                <p className="text-xs opacity-70">
                  সমর্থিত ফরম্যাট: JPG, PNG (সর্বোচ্চ ৫MB)
                </p>
              </div>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={!file || isVerifying}
            className="w-full brutal bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                যাচাই করা হচ্ছে...
              </>
            ) : (
              <>
                <FileCheck className="w-6 h-6" />
                যাচাই করুন
              </>
            )}
          </button>

          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl flex items-start gap-3 text-sm text-amber-600 dark:text-amber-500">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <p>
              <strong>সতর্কতা:</strong> এটি একটি এআই-ভিত্তিক প্রাথমিক যাচাইকরণ।
              চূড়ান্ত সিদ্ধান্তের জন্য সংশ্লিষ্ট কর্তৃপক্ষের সাথে যোগাযোগ করুন।
            </p>
          </div>
        </div>

        {/* Results Section */}
        <div>
          {result ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="brutal bg-card p-6 rounded-2xl h-full flex flex-col"
            >
              <h2 className="text-xl font-bold mb-6 pb-4 border-b border-border flex items-center gap-2">
                যাচাইকরণের ফলাফল
              </h2>

              <div className="flex items-center gap-4 mb-8 p-4 rounded-xl bg-muted/50 border border-border">
                {result.isAuthentic ? (
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 shrink-0" />
                ) : (
                  <XCircle className="w-12 h-12 text-destructive shrink-0" />
                )}
                <div>
                  <h3
                    className={`text-lg font-bold ${result.isAuthentic ? "text-emerald-500" : "text-destructive"}`}
                  >
                    {result.isAuthentic
                      ? "প্রাথমিকভাবে সঠিক মনে হচ্ছে"
                      : "সন্দেহজনক ডকুমেন্ট"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ডকুমেন্টের ধরন: <strong>{result.documentType}</strong>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    নিশ্চয়তার হার (Confidence):{" "}
                    <strong>{result.confidence}%</strong>
                  </p>
                </div>
              </div>

              {Object.keys(result.extractedInfo || {}).length > 0 && (
                <div className="mb-8">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-muted-foreground">
                    প্রাপ্ত তথ্য
                  </h4>
                  <div className="space-y-2 bg-muted/30 p-4 rounded-xl border border-border">
                    {Object.entries(result.extractedInfo).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className="flex flex-col sm:flex-row sm:justify-between py-1 border-b border-border/50 last:border-0"
                        >
                          <span className="text-sm text-muted-foreground">
                            {key}:
                          </span>
                          <span className="text-sm font-medium text-right">
                            {value as string}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {result.warnings && result.warnings.length > 0 && (
                <div className="mt-auto">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wider text-destructive flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> সতর্কতা
                  </h4>
                  <ul className="space-y-2">
                    {result.warnings.map((warning: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-sm text-destructive/90 bg-destructive/10 p-3 rounded-lg border border-destructive/20"
                      >
                        {warning}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <FeedbackRating title="এই যাচাইকরণ ফলাফলটি কি আপনার জন্য সহায়ক ছিল?" />
            </motion.div>
          ) : (
            <div className="h-full min-h-[400px] brutal bg-card/50 border-dashed p-8 rounded-2xl flex flex-col items-center justify-center text-center">
              <FileCheck className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                ফলাফল এখানে প্রদর্শিত হবে
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                বাম পাশে আপনার ডকুমেন্ট আপলোড করে যাচাই করুন বাটনে ক্লিক করুন।
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
