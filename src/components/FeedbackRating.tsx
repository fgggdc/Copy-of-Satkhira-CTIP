import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";

interface FeedbackRatingProps {
  title?: string;
}

export default function FeedbackRating({ title = "এই তথ্যটি কি আপনার জন্য সহায়ক ছিল?" }: FeedbackRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="mt-8 p-6 bg-emerald-50 border border-emerald-200 rounded-2xl flex flex-col items-center justify-center text-center">
        <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-3" />
        <h3 className="text-lg font-bold text-emerald-700 mb-1">ধন্যবাদ!</h3>
        <p className="text-emerald-600/90 text-sm">আপনার মতামতের জন্য ধন্যবাদ। এটি আমাদের সেবার মান উন্নত করতে সাহায্য করবে।</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-6 bg-muted/30 border border-border rounded-2xl">
      <h3 className="text-lg font-bold mb-4 text-center">{title}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="flex items-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              className="focus:outline-none transition-transform hover:scale-110"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            >
              <Star
                className={`w-8 h-8 ${
                  star <= (hover || rating)
                    ? "fill-amber-400 text-amber-400"
                    : "text-muted-foreground/30"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
        
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="আপনার মতামত লিখুন (ঐচ্ছিক)..."
          className="w-full max-w-md p-3 rounded-xl border border-border bg-background focus:ring-2 focus:ring-primary outline-none transition-all resize-none mb-4 text-sm"
          rows={3}
        />
        
        <button
          type="submit"
          disabled={rating === 0}
          className="brutal bg-primary text-primary-foreground px-6 py-2 rounded-lg font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
        >
          মতামত জমা দিন
        </button>
      </form>
    </div>
  );
}
