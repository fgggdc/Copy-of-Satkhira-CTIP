import { Facebook, Twitter, Share2, MessageCircle } from "lucide-react";

interface ShareButtonsProps {
  url: string;
  title: string;
  text: string;
}

export default function ShareButtons({ url, title, text }: ShareButtonsProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
  };

  const handleShare = (e: React.MouseEvent<HTMLAnchorElement>, platformUrl: string) => {
    e.preventDefault();
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
      <span className="text-sm font-medium text-muted-foreground flex items-center gap-1">
        <Share2 className="w-4 h-4" /> শেয়ার করুন:
      </span>
      <a
        href={shareLinks.facebook}
        onClick={(e) => handleShare(e, shareLinks.facebook)}
        className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
        aria-label="Share on Facebook"
      >
        <Facebook className="w-4 h-4" />
      </a>
      <a
        href={shareLinks.twitter}
        onClick={(e) => handleShare(e, shareLinks.twitter)}
        className="p-2 rounded-full bg-sky-50 text-sky-500 hover:bg-sky-100 transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </a>
      <a
        href={shareLinks.whatsapp}
        onClick={(e) => handleShare(e, shareLinks.whatsapp)}
        className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
        aria-label="Share on WhatsApp"
      >
        <MessageCircle className="w-4 h-4" />
      </a>
    </div>
  );
}
