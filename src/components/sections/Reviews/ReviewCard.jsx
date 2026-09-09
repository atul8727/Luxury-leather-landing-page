import Image from "next/image";
import { Star } from "lucide-react";

export default function ReviewCard({ review }) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-ink/10 bg-white/80 p-6">
      <div className="flex items-center gap-1 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-4 flex-1 text-[14.5px] leading-relaxed text-ink-soft">&ldquo;{review.text}&rdquo;</p>
      <div className="mt-6 flex items-center gap-3">
        <div className="relative h-10 w-10 overflow-hidden rounded-full">
          <Image src={review.avatar} alt={review.name} fill sizes="40px" className="object-cover" />
        </div>
        <span className="font-display text-[15px] text-ink">{review.name}</span>
      </div>
    </div>
  );
}
