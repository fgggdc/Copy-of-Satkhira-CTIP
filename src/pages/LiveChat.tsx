import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Loader2, Paperclip, X } from "lucide-react";
import { motion } from "motion/react";
import { GoogleGenAI } from "@google/genai";
import Markdown from "react-markdown";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  file?: {
    data: string;
    mimeType: string;
    name: string;
  };
}

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "model",
      text: "নমস্কার! আমি সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট হেল্প কর্নারের এআই অ্যাসিস্ট্যান্ট। আমি আপনাকে কীভাবে সাহায্য করতে পারি? (যেমন: ভিসা, পাসপোর্ট, বিদেশে যাওয়ার নিয়মকানুন, অথবা সোশ্যাল মিডিয়ায় মানব পাচারের ফাঁদ থেকে বাঁচার উপায় সম্পর্কে জানতে পারেন)",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ file: File; data: string; mimeType: string } | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(",")[1];
      setSelectedFile({
        file,
        data: base64String,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedFile) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      text: input.trim(),
      file: selectedFile ? {
        data: selectedFile.data,
        mimeType: selectedFile.mimeType,
        name: selectedFile.file.name,
      } : undefined,
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setSelectedFile(null);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const contents = newMessages.map(msg => {
        const parts: any[] = [];
        if (msg.file) {
          parts.push({
            inlineData: {
              data: msg.file.data,
              mimeType: msg.file.mimeType,
            }
          });
        }
        if (msg.text) {
          parts.push({ text: msg.text });
        }
        return {
          role: msg.role,
          parts: parts.length > 0 ? parts : [{ text: " " }],
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents,
        config: {
          systemInstruction:
            'You are a helpful customer support agent for "Satkhira CTIP (Counter Trafficking in Persons) Activist", a platform helping Bangladeshis with safe migration abroad, preventing human trafficking, and specifically addressing the prevention of human trafficking through social media platforms in the current times. You MUST ALWAYS answer in Bengali. Be polite, concise, and informative. Provide guidance on visas, passports, avoiding scams, human trafficking prevention (especially online and social media traps), and emergency contacts.',
        },
      });

      const modelMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: response.text || "দুঃখিত, আমি বুঝতে পারিনি।",
      };

      setMessages((prev) => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "model",
        text: "দুঃখিত, একটি প্রযুক্তিগত সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl h-[85vh] min-h-[500px]">
      <div className="brutal bg-card rounded-2xl h-full flex flex-col overflow-hidden border-2 border-border shadow-lg">
        {/* Chat Header */}
        <div className="bg-primary text-primary-foreground p-4 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg">
              সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট হেল্প কর্নার
            </h2>
            <p className="text-xs text-primary-foreground/80 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              এআই অ্যাসিস্ট্যান্ট অনলাইন
            </p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/10">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {msg.role === "user" ? (
                  <User className="w-5 h-5" />
                ) : (
                  <Bot className="w-5 h-5" />
                )}
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border border-border rounded-tl-sm shadow-sm"
                }`}
              >
                {msg.role === "user" ? (
                  <div className="flex flex-col gap-2 items-end">
                    {msg.file && (
                      msg.file.mimeType.startsWith("image/") ? (
                        <img src={`data:${msg.file.mimeType};base64,${msg.file.data}`} alt={msg.file.name} className="max-w-full sm:max-w-[250px] rounded-lg object-contain" />
                      ) : (
                        <div className="flex items-center gap-2 bg-primary-foreground/10 p-2 rounded-lg text-sm w-fit">
                          <Paperclip className="w-4 h-4" />
                          <span className="truncate max-w-[200px]">{msg.file.name}</span>
                        </div>
                      )
                    )}
                    {msg.text && <p className="text-base leading-relaxed">{msg.text}</p>}
                  </div>
                ) : (
                  <div className="markdown-body text-base leading-relaxed prose prose-base dark:prose-invert max-w-none">
                    <Markdown>{msg.text}</Markdown>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm p-4 shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  টাইপ করছে...
                </span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-card border-t border-border flex flex-col gap-2">
          {selectedFile && (
            <div className="flex items-center gap-2 bg-muted p-2 rounded-lg text-sm w-fit self-start">
              {selectedFile.mimeType.startsWith("image/") ? (
                <img src={`data:${selectedFile.mimeType};base64,${selectedFile.data}`} alt={selectedFile.file.name} className="w-8 h-8 object-cover rounded" />
              ) : (
                <Paperclip className="w-4 h-4" />
              )}
              <span className="truncate max-w-[200px]">{selectedFile.file.name}</span>
              <button 
                type="button" 
                onClick={() => setSelectedFile(null)}
                className="text-muted-foreground hover:text-foreground ml-2 p-1 rounded-full hover:bg-background transition-colors"
                title="ফাইল মুছুন"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <form onSubmit={handleSend} className="flex gap-2">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-3 rounded-xl bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              title="ফাইল সংযুক্ত করুন"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="আপনার প্রশ্ন লিখুন..."
              className="flex-1 p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={(!input.trim() && !selectedFile) || isTyping}
              className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <p className="text-xs text-center text-muted-foreground mt-2">
            সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট হেল্প কর্নার
          </p>
        </div>
      </div>
    </div>
  );
}
