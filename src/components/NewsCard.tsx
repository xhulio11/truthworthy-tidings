
import { useState } from "react";
import { Card } from "@/components/ui/card";

interface NewsCardProps {
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  variant?: "default" | "compact";
}

const NewsCard = ({ title, excerpt, imageUrl, date, variant = "default" }: NewsCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Card className={`news-card overflow-hidden bg-[#fff8ec] ${variant === "compact" ? "h-full" : ""}`}>
      <div className={`${variant === "compact" ? "aspect-[16/10]" : "aspect-video"} relative overflow-hidden`}>
        <div className={`absolute inset-0 bg-slate-200 ${imageLoaded ? "hidden" : "block"}`} />
        <img
          src={imageUrl}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div className={variant === "compact" ? "p-4" : "p-6"}>
        <div className="text-xs text-slate-500 mb-2">{date}</div>
        <h3 className={`${
          variant === "compact" ? "text-lg" : "text-xl"
        } font-semibold text-slate-900 mb-2 line-clamp-2`}>
          {title}
        </h3>
        <p className={`text-slate-600 ${
          variant === "compact" ? "text-sm line-clamp-2" : "line-clamp-3"
        }`}>
          {excerpt}
        </p>
      </div>
    </Card>
  );
};

export default NewsCard;
