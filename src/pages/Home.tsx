import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Mic,
  FileCheck,
  Search,
  MessageSquare,
  PhoneCall,
  ShieldAlert,
  Palette,
  AlertTriangle,
} from "lucide-react";

export default function Home() {
  const [isNeoBrutal, setIsNeoBrutal] = useState(false);

  const features = [
    {
      title: "ভয়েস পরামর্শ",
      description:
        "সরাসরি বাংলায় কথা বলে এআই-এর কাছ থেকে অভিবাসন সংক্রান্ত পরামর্শ নিন।",
      icon: <Mic className="h-8 w-8 text-primary" />,
      path: "/voice-assistant",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      title: "ভিসা চেক টুল",
      description:
        "যেকোনো দেশের ভিসার ধরন, প্রয়োজনীয় কাগজপত্র ও ফি সম্পর্কে নির্ভুল তথ্য জানুন।",
      icon: <Search className="h-8 w-8 text-primary" />,
      path: "/visa-check",
      color: "bg-emerald-500/10 text-emerald-500",
    },
    {
      title: "ডকুমেন্ট যাচাই",
      description: "আপনার পাসপোর্ট, শিক্ষাগত সনদ ও চুক্তির সত্যতা যাচাই করুন।",
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      path: "/document-verification",
      color: "bg-amber-500/10 text-amber-500",
    },
    {
      title: "লাইভ চ্যাট",
      description:
        "এআই-চালিত চ্যাটবট বা মানব অপারেটরের সাথে তাৎক্ষণিক যোগাযোগ করুন।",
      icon: <MessageSquare className="h-8 w-8 text-primary" />,
      path: "/live-chat",
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      title: "জরুরি সেবা",
      description:
        "বাংলাদেশ দূতাবাস, কনস্যুলেট ও স্থানীয় জরুরি সেবার নম্বর খুঁজুন।",
      icon: <PhoneCall className="h-8 w-8 text-primary" />,
      path: "/emergency-services",
      color: "bg-rose-500/10 text-rose-500",
    },
    {
      title: "কর্মী উদ্ধার সহায়তা",
      description:
        "বিদেশে বিপদগ্রস্ত হলে সরাসরি উদ্ধার সহায়তা পেতে বিশেষ নম্বরে যোগাযোগ করুন।",
      icon: <ShieldAlert className="h-8 w-8 text-primary" />,
      path: "/rescue-numbers",
      color: "bg-red-500/10 text-red-500",
    },
    {
      title: "মানব পাচার সচেতনতা",
      description:
        "মানব পাচারের লক্ষণগুলো জানুন এবং নিজেকে ও অন্যদের নিরাপদ রাখতে সচেতন হোন।",
      icon: <AlertTriangle className="h-8 w-8 text-primary" />,
      path: "/safety-tips",
      color: "bg-orange-500/10 text-orange-500",
    },
  ];

  return (
    <div className={`flex flex-col min-h-screen ${isNeoBrutal ? "font-mono" : ""}`}>
      {/* Theme Toggle */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsNeoBrutal(!isNeoBrutal)}
          className={`flex items-center gap-2 px-4 py-3 rounded-full font-bold transition-all ${
            isNeoBrutal
              ? "bg-[#FFEB3B] text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              : "bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1"
          }`}
        >
          <Palette className="w-5 h-5" />
          {isNeoBrutal ? "নিও-ব্রুটালিজম: অন" : "নিও-ব্রুটালিজম: অফ"}
        </button>
      </div>

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 lg:py-32 ${isNeoBrutal ? "bg-[#E0F7FA] dark:bg-[#006064] border-b-4 border-black dark:border-white" : "bg-background"}`}>
        {!isNeoBrutal && <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/migration/1920/1080?blur=10')] bg-cover bg-center opacity-10 dark:opacity-20"></div>}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              বিদেশে নিরাপদ অভিবাসন নিশ্চিত করতে{" "}
              <span className="text-primary">সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-muted-foreground mb-10"
            >
              প্রতারণা ও অনিয়ম থেকে রক্ষা করে নিরাপদ অভিবাসন নিশ্চিত করার জন্য
              একটি আধুনিক ডিজিটাল প্ল্যাটফর্ম। সঠিক তথ্য, দিকনির্দেশনা ও জরুরি
              সহায়তা পেতে আমাদের সাথে যুক্ত হোন।
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/voice-assistant"
                className={`${isNeoBrutal ? "brutal bg-[#FF9800] text-black" : "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"} px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2`}
              >
                <Mic className="h-5 w-5" />
                ভয়েস পরামর্শ নিন
              </Link>
              <Link
                to="/visa-check"
                className={`${isNeoBrutal ? "brutal bg-[#4CAF50] text-black" : "bg-secondary text-secondary-foreground shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"} px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2`}
              >
                <Search className="h-5 w-5" />
                ভিসা চেক করুন
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isNeoBrutal ? "bg-[#FFF9C4] dark:bg-[#424242] border-b-4 border-black dark:border-white" : "bg-muted/30"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              আমাদের সেবাসমূহ
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              আধুনিক প্রযুক্তি ব্যবহার করে আমরা অভিবাসন প্রক্রিয়াকে সহজ, নিরাপদ
              ও স্বচ্ছ করার চেষ্টা করছি।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={feature.path}
                  className={`block h-full p-8 rounded-2xl transition-all ${
                    isNeoBrutal 
                      ? "brutal bg-white dark:bg-black" 
                      : "bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1"
                  }`}
                >
                  <div
                    className={`inline-flex p-4 rounded-xl mb-6 ${
                      isNeoBrutal ? "border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]" : ""
                    } ${feature.color}`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className={`py-20 ${isNeoBrutal ? "bg-[#F44336] text-black border-t-4 border-black" : "bg-destructive text-destructive-foreground"}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShieldAlert className={`h-16 w-16 mx-auto mb-6 ${isNeoBrutal ? "text-black" : "opacity-80"}`} />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            বিদেশে বিপদে পড়েছেন?
          </h2>
          <p className={`text-xl mb-8 max-w-2xl mx-auto ${isNeoBrutal ? "text-black font-medium" : "opacity-90"}`}>
            যেকোনো জরুরি পরিস্থিতিতে সরাসরি উদ্ধার সহায়তা পেতে আমাদের বিশেষ
            নম্বরে যোগাযোগ করুন অথবা SOS বোতাম চাপুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:16135"
              className={`${isNeoBrutal ? "brutal bg-white text-black" : "bg-white text-destructive shadow-md hover:shadow-lg hover:-translate-y-1 transition-all"} px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2`}
            >
              <PhoneCall className="h-5 w-5" />
              কল করুন: ১৬১৩৫
            </a>
            <Link
              to="/rescue-numbers"
              className={`${isNeoBrutal ? "brutal bg-black text-white dark:bg-white dark:text-black" : "bg-transparent border-2 border-white text-white hover:bg-white/10 transition-all"} px-8 py-4 rounded-xl font-bold text-lg inline-flex items-center justify-center gap-2`}
            >
              অন্যান্য জরুরি নম্বর
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
