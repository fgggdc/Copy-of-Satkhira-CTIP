import {
  ShieldAlert,
  PhoneCall,
  Mail,
  Globe,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import { motion } from "motion/react";
import ShareButtons from "../components/ShareButtons";

export default function RescueNumbers() {
  const rescueServices = [
    {
      title: "প্রবাসী কল্যাণ ডেস্ক",
      description:
        "বাংলাদেশ সরকারের প্রবাসী কল্যাণ ও বৈদেশিক কর্মসংস্থান মন্ত্রণালয়ের হেল্পলাইন।",
      phone: "১৬১৩৫",
      international: "+৮৮০ ৯৬১০-০১৬১৩৫",
      email: "helpdesk@probashi.gov.bd",
      color:
        "bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
      iconColor: "text-emerald-500",
    },
    {
      title: "আন্তর্জাতিক অভিবাসন সংস্থা (IOM)",
      description:
        "বিপদগ্রস্ত অভিবাসীদের উদ্ধার ও সহায়তায় আন্তর্জাতিক সংস্থা।",
      phone: "+৮৮০ ২ ৫৫৬৬ ৭৭০০",
      international: "+41 22 717 9111 (Geneva HQ)",
      email: "iomdhaka@iom.int",
      color:
        "bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400",
      iconColor: "text-blue-500",
    },
    {
      title: "মানব পাচার প্রতিরোধ হেল্পলাইন",
      description:
        "মানব পাচারের শিকার হলে বা সন্দেহ হলে তাৎক্ষণিক যোগাযোগের জন্য।",
      phone: "৯৯৯ (জাতীয় জরুরি সেবা)",
      international: "+৮৮০ ২ ৯৫৬ ১৯০৫ (পুলিশ হেডকোয়ার্টার্স)",
      email: "htc.phq@police.gov.bd",
      color: "bg-destructive/10 border-destructive/20 text-destructive",
      iconColor: "text-destructive",
    },
    {
      title: "ব্র্যাক মাইগ্রেশন প্রোগ্রাম",
      description:
        "বিদেশে আটকে পড়া বা প্রতারিত কর্মীদের আইনি ও উদ্ধার সহায়তা।",
      phone: "০৯৬৬৬ ৭৭৭ ৭৭৭",
      international: "+৮৮০ ২ ৯৮৮ ১২৬৫",
      email: "migration@brac.net",
      color:
        "bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400",
      iconColor: "text-purple-500",
      website: "http://migration.brac.net/"
    },
    {
      title: "ওকুপ (OKUP)",
      description:
        "অভিবাসী কর্মী উন্নয়ন প্রোগ্রাম - প্রতারিত কর্মীদের আইনি সহায়তা ও পুনর্বাসন।",
      phone: "+৮৮০ ১৭৩৩ ২২৬ ৬৬৬",
      international: "+৮৮০ ২ ৭২৯ ৫৩১১",
      email: "okup.ent@gmail.com",
      color:
        "bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400",
      iconColor: "text-orange-500",
      website: "https://okup.org.bd/"
    },
    {
      title: "বাপিরা (BAPIRA)",
      description:
        "বাংলাদেশ অ্যাসোসিয়েশন অব ইন্টারন্যাশনাল রিক্রুটিং এজেন্সিজ - অভিযোগ কেন্দ্র।",
      phone: "+৮৮০ ২ ৪৮৩১৯৬২৩",
      international: "+৮৮০ ২ ৪৮৩১৯৬২৪",
      email: "info@baira.org.bd",
      color:
        "bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400",
      iconColor: "text-teal-500",
      website: "https://baira.org.bd/"
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="text-center mb-12">
        <ShieldAlert className="w-16 h-16 mx-auto mb-6 text-destructive" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-destructive">
          কর্মী উদ্ধার সহায়তা
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          বিদেশে বিপদগ্রস্ত হলে, প্রতারণার শিকার হলে বা আটকে পড়লে সরাসরি উদ্ধার
          সহায়তা পেতে নিচের নম্বরগুলোতে যোগাযোগ করুন।
        </p>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl mb-12 flex items-start gap-4">
        <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-bold text-amber-600 dark:text-amber-500 mb-2">
            জরুরি নির্দেশনা
          </h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-amber-600/90 dark:text-amber-500/90">
            <li>
              বিপদে পড়লে শান্ত থাকুন এবং আপনার সঠিক অবস্থান (Location) কাউকে
              জানানোর চেষ্টা করুন।
            </li>
            <li>
              আপনার পাসপোর্ট নম্বর, ভিসার কপি এবং এজেন্সির নাম সংগ্রহে রাখুন।
            </li>
            <li>সম্ভব হলে স্থানীয় পুলিশের (৯৯৯) সাথে যোগাযোগ করুন।</li>
            <li>
              দূতাবাসের জরুরি নম্বরে কল করুন (জরুরি সেবা পেজে তালিকাভুক্ত)।
            </li>
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {rescueServices.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`brutal bg-card p-8 rounded-2xl border-2 ${service.color} hover:bg-muted/30 transition-colors`}
          >
            <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
              <Globe className={`w-6 h-6 ${service.iconColor}`} />
              {service.title}
            </h2>
            <p className="text-muted-foreground mb-8 min-h-[48px]">
              {service.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                <div className="flex items-center gap-3">
                  <PhoneCall className={`w-5 h-5 ${service.iconColor}`} />
                  <span className="text-sm font-medium text-muted-foreground">
                    বাংলাদেশ থেকে
                  </span>
                </div>
                <span className="font-bold text-lg">{service.phone}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                <div className="flex items-center gap-3">
                  <Globe className={`w-5 h-5 ${service.iconColor}`} />
                  <span className="text-sm font-medium text-muted-foreground">
                    বিদেশ থেকে
                  </span>
                </div>
                <span className="font-bold">{service.international}</span>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl bg-background border border-border">
                <div className="flex items-center gap-3">
                  <Mail className={`w-5 h-5 ${service.iconColor}`} />
                  <span className="text-sm font-medium text-muted-foreground">
                    ইমেইল
                  </span>
                </div>
                <span className="font-medium text-sm break-all">
                  {service.email}
                </span>
              </div>
            </div>

            <a
              href={`tel:${service.phone.replace(/[^0-9+]/g, "")}`}
              className={`mt-6 w-full brutal py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 text-white transition-opacity hover:opacity-90 ${
                service.title.includes("পাচার")
                  ? "bg-destructive"
                  : "bg-primary"
              }`}
            >
              <PhoneCall className="w-5 h-5" />
              এখনই কল করুন
            </a>

            {service.website && (
              <a
                href={service.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full brutal py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 bg-muted text-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <ExternalLink className="w-5 h-5" />
                ওয়েবসাইট ভিজিট করুন
              </a>
            )}
            
            <ShareButtons 
              url={window.location.href} 
              title={`${service.title} - কর্মী উদ্ধার সহায়তা`}
              text={`বিদেশে বিপদগ্রস্ত হলে ${service.title} এর সাথে যোগাযোগ করুন। ফোন: ${service.phone}, বিদেশ থেকে: ${service.international}`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
