import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ShieldCheck, Users, Settings, Database } from "lucide-react";

export default function AdminPanel() {
  const { user, isAdmin } = useAuth();

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">অ্যাডমিন প্যানেল</h1>
      </div>

      <p className="text-muted-foreground mb-12 max-w-2xl text-lg">
        স্বাগতম, {user.email}! এটি আপনার অ্যাডমিন ড্যাশবোর্ড। এখান থেকে আপনি সিস্টেমের বিভিন্ন অংশ নিয়ন্ত্রণ করতে পারবেন।
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">ব্যবহারকারী ব্যবস্থাপনা</h2>
          <p className="text-muted-foreground text-sm">
            সিস্টেমের সকল ব্যবহারকারীদের তালিকা দেখুন এবং তাদের এক্সেস নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Database className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">ডেটাবেস ব্যাকআপ</h2>
          <p className="text-muted-foreground text-sm">
            সিস্টেমের গুরুত্বপূর্ণ ডেটা ব্যাকআপ নিন এবং পূর্ববর্তী ডেটা রিস্টোর করুন।
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Settings className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">সিস্টেম সেটিংস</h2>
          <p className="text-muted-foreground text-sm">
            অ্যাপ্লিকেশনের বিভিন্ন গ্লোবাল সেটিংস এবং কনফিগারেশন পরিবর্তন করুন।
          </p>
        </div>
      </div>
    </motion.div>
  );
}
