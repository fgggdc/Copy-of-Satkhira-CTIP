import { Link } from "react-router-dom";
import { Globe, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <Globe className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight">
                সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              বিদেশে নিরাপদ অভিবাসন নিশ্চিত করতে একটি ডিজিটাল প্ল্যাটফর্ম। সঠিক
              তথ্য, দিকনির্দেশনা ও জরুরি সহায়তা প্রদান আমাদের লক্ষ্য।
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/voice-assistant"
                  className="hover:text-primary transition-colors"
                >
                  হেল্প কর্নার
                </Link>
              </li>
              <li>
                <Link
                  to="/visa-check"
                  className="hover:text-primary transition-colors"
                >
                  ভিসা চেক
                </Link>
              </li>
              <li>
                <Link
                  to="/document-verification"
                  className="hover:text-primary transition-colors"
                >
                  ডকুমেন্ট যাচাই
                </Link>
              </li>
              <li>
                <Link
                  to="/live-chat"
                  className="hover:text-primary transition-colors"
                >
                  লাইভ চ্যাট
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">জরুরি সেবা</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/emergency-services"
                  className="hover:text-primary transition-colors"
                >
                  দূতাবাস ও হেল্পলাইন
                </Link>
              </li>
              <li>
                <Link
                  to="/rescue-numbers"
                  className="hover:text-primary transition-colors"
                >
                  কর্মী উদ্ধার সহায়তা
                </Link>
              </li>
              <li>
                <a
                  href="tel:16135"
                  className="hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Phone className="h-4 w-4" /> প্রবাসী কল্যাণ ডেস্ক (১৬১৩৫)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">যোগাযোগ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> সাতক্ষীরা, বাংলাদেশ
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +৮৮০ ১২৩৪ ৫৬৭৮৯০
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> support@satkhiractipactivist.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} সাতক্ষীরা সিটিআইপি আ্যাক্টিভিস্ট.
            সর্বস্বত্ব সংরক্ষিত.
          </p>
        </div>
      </div>
    </footer>
  );
}
