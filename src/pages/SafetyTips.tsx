import { useState } from "react";
import { 
  ShieldCheck, 
  AlertTriangle, 
  FileWarning, 
  Book, 
  Briefcase, 
  PhoneCall, 
  ChevronDown, 
  ChevronUp,
  Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ShareButtons from "../components/ShareButtons";

export default function SafetyTips() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const safetyCategories = [
    {
      title: "বিদেশ যাওয়ার আগে প্রস্তুতি",
      icon: <Briefcase className="w-6 h-6 text-blue-500" />,
      color: "border-blue-500/20 bg-blue-500/5",
      tips: [
        "শুধুমাত্র সরকার অনুমোদিত রিক্রুটিং এজেন্সির মাধ্যমে বিদেশে যাওয়ার প্রক্রিয়া সম্পন্ন করুন।",
        "বিএমইটি (BMET) ডাটাবেজে আপনার নাম নিবন্ধন করুন এবং স্মার্ট কার্ড সংগ্রহ করুন।",
        "চুক্তির শর্তাবলী (বেতন, থাকা-খাওয়া, ছুটি, চিকিৎসা) ভালোভাবে পড়ে বুঝে তারপর স্বাক্ষর করুন।",
        "ভিসা, পাসপোর্ট এবং চুক্তির একাধিক ফটোকপি নিজের কাছে এবং পরিবারের কাছে রাখুন।",
        "যে দেশে যাচ্ছেন, সে দেশের ভাষা, আইনকানুন এবং সংস্কৃতি সম্পর্কে প্রাথমিক ধারণা নিন।"
      ]
    },
    {
      title: "দালাল ও প্রতারণা থেকে বাঁচার উপায়",
      icon: <AlertTriangle className="w-6 h-6 text-amber-500" />,
      color: "border-amber-500/20 bg-amber-500/5",
      tips: [
        "অপরিচিত বা লাইসেন্সবিহীন দালালের হাতে টাকা বা পাসপোর্ট দেবেন না।",
        "টাকা লেনদেনের সময় অবশ্যই ব্যাংক বা বৈধ মাধ্যমে করুন এবং মানি রিসিট সংরক্ষণ করুন।",
        "ফ্রি ভিসা বা ভিজিট ভিসায় গিয়ে কাজ করার প্রতিশ্রুতি দিলে তা বিশ্বাস করবেন না, এটি সম্পূর্ণ বেআইনি।",
        "ভিসা চেক টুলের মাধ্যমে বা সংশ্লিষ্ট দেশের দূতাবাসের ওয়েবসাইট থেকে আপনার ভিসার সত্যতা যাচাই করুন।",
        "অস্বাভাবিক বেশি বেতনের প্রলোভন দেখালে সতর্ক হোন এবং যাচাই করুন।"
      ]
    },
    {
      title: "পাসপোর্ট ও জরুরি নথিপত্রের নিরাপত্তা",
      icon: <Book className="w-6 h-6 text-emerald-500" />,
      color: "border-emerald-500/20 bg-emerald-500/5",
      tips: [
        "আপনার মূল পাসপোর্ট কখনোই নিয়োগকর্তা বা অন্য কারো কাছে জমা দেবেন না। এটি আপনার অধিকার।",
        "পাসপোর্টের মেয়াদ শেষ হওয়ার অন্তত ৬ মাস আগে নবায়নের জন্য আবেদন করুন।",
        "জরুরি নথিপত্র (পাসপোর্ট, ভিসা, চুক্তিপত্র, আইডি কার্ড) এর স্ক্যান কপি নিজের ইমেইলে সেভ করে রাখুন।",
        "পাসপোর্ট হারিয়ে গেলে সাথে সাথে স্থানীয় পুলিশ স্টেশনে জিডি করুন এবং বাংলাদেশ দূতাবাসে যোগাযোগ করুন।"
      ]
    },
    {
      title: "কর্মস্থলে শোষণ ও নির্যাতন প্রতিরোধ",
      icon: <FileWarning className="w-6 h-6 text-rose-500" />,
      color: "border-rose-500/20 bg-rose-500/5",
      tips: [
        "চুক্তি অনুযায়ী বেতন না দিলে বা অতিরিক্ত কাজ করালে স্থানীয় শ্রম আদালতে বা বাংলাদেশ দূতাবাসে অভিযোগ করুন।",
        "শারীরিক বা মানসিক নির্যাতনের শিকার হলে দ্রুত স্থানীয় পুলিশ (যেমন: ৯৯৯) বা জরুরি সেবায় কল করুন।",
        "কখনোই অবৈধভাবে কাজ পরিবর্তন বা পালিয়ে যাওয়ার চেষ্টা করবেন না, এতে আপনি আইনি ঝুঁকিতে পড়বেন।",
        "বিপদে পড়লে 'কর্মী উদ্ধার সহায়তা' পেজে দেওয়া নম্বরগুলোতে যোগাযোগ করুন।"
      ]
    },
    {
      title: "জরুরি যোগাযোগ ও নেটওয়ার্কিং",
      icon: <PhoneCall className="w-6 h-6 text-purple-500" />,
      color: "border-purple-500/20 bg-purple-500/5",
      tips: [
        "আপনার গন্তব্য দেশের বাংলাদেশ দূতাবাস এবং শ্রম উইংয়ের নম্বর সবসময় মোবাইলে সেভ করে রাখুন।",
        "পরিবারের সাথে নিয়মিত যোগাযোগ রাখুন এবং আপনার বর্তমান ঠিকানা ও ফোন নম্বর তাদের জানিয়ে রাখুন।",
        "বিদেশে অবস্থানরত বাংলাদেশি কমিউনিটি বা সংগঠনের সাথে যুক্ত থাকুন।",
        "যেকোনো জরুরি পরিস্থিতিতে ঘাবড়ে না গিয়ে শান্ত থাকুন এবং সঠিক কর্তৃপক্ষের সাহায্য নিন।"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full mb-6">
          <ShieldCheck className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">নিরাপত্তা ও সতর্কতা</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          বিদেশে নিরাপদ অভিবাসন নিশ্চিত করতে এবং যেকোনো ধরনের প্রতারণা বা শোষণ থেকে নিজেকে রক্ষা করতে এই নির্দেশিকাগুলো মেনে চলুন।
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl mb-12 flex items-start gap-4">
        <Lightbulb className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-amber-600 dark:text-amber-500 mb-2">
            জরুরি পরামর্শ
          </h3>
          <p className="text-sm text-amber-600/90 dark:text-amber-500/90 leading-relaxed">
            মানব পাচার একটি গুরুতর অপরাধ। কেউ যদি আপনাকে অবৈধ পথে (যেমন: সাগরপথে বা সীমান্ত পেরিয়ে) বিদেশে যাওয়ার প্রস্তাব দেয়, তবে সাথে সাথে আইনশৃঙ্খলা রক্ষাকারী বাহিনীকে জানান। অবৈধ পথে বিদেশ যাত্রা আপনার জীবনের জন্য চরম ঝুঁকিপূর্ণ হতে পারে।
          </p>
        </div>
      </div>

      <div className="space-y-4 mb-12">
        {safetyCategories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`brutal bg-card border-2 rounded-2xl overflow-hidden ${category.color}`}
          >
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-background rounded-xl shadow-sm">
                  {category.icon}
                </div>
                <h2 className="text-xl font-bold">{category.title}</h2>
              </div>
              {openIndex === index ? (
                <ChevronUp className="w-6 h-6 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-6 h-6 text-muted-foreground" />
              )}
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="px-6 pb-6 pt-2 border-t border-border/50">
                    <ul className="space-y-3">
                      {category.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                          <p className="text-muted-foreground leading-relaxed">{tip}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="brutal bg-card p-8 rounded-2xl text-center">
        <h3 className="text-xl font-bold mb-4">তথ্যটি অন্যদের সাথে শেয়ার করুন</h3>
        <p className="text-muted-foreground mb-6">
          আপনার একটি শেয়ার হয়তো কাউকে প্রতারণার হাত থেকে বাঁচাতে পারে।
        </p>
        <ShareButtons 
          url={window.location.href} 
          title="নিরাপদ অভিবাসন: সতর্কতা ও নির্দেশিকা"
          text="বিদেশে যাওয়ার আগে এবং বিদেশে অবস্থানকালে নিরাপদ থাকতে এই গুরুত্বপূর্ণ নির্দেশিকাগুলো জেনে নিন।"
        />
      </div>
    </div>
  );
}
