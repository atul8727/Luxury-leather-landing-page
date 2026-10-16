// Server-side: Instagram reels auto fetch (Behold.so JSON feed se).
// Behold handles Instagram access tokens and caching.
import { REELS, INSTAGRAM_REELS_URL } from "@/data/reels";

const MAX_REELS = 12;

function shortcodeFromUrl(url = "") {
  const m = url.match(/\/(?:reel|reels|p)\/([^/?#]+)/);
  return m ? m[1] : "";
}

function formatCount(n) {
  if (typeof n !== "number") return undefined;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function normalizePost(p) {
  const isVideo = p.mediaType === "VIDEO" || Boolean(p.isReel);
  const videoUrl = isVideo && p.mediaUrl ? p.mediaUrl : (p.videoUrl || p.video || "");
  const thumbnail =
    p.sizes?.medium?.mediaUrl ||
    p.sizes?.small?.mediaUrl ||
    p.thumbnailUrl ||
    (p.mediaType !== "VIDEO" ? p.mediaUrl : "") ||
    p.thumbnail ||
    "";

  const rawViews = p.viewCount ?? p.videoViewCount ?? p.plays ?? p.views;
  const views =
    typeof rawViews === "number"
      ? formatCount(rawViews)
      : typeof rawViews === "string"
      ? rawViews
      : undefined;

  const captionText = p.prunedCaption || p.caption || "";
  const firstLine = captionText.split("\n")[0].trim();
  const caption = firstLine.length > 70 ? `${firstLine.slice(0, 67)}...` : firstLine;

  return {
    id: p.id,
    shortcode: shortcodeFromUrl(p.permalink),
    thumbnail,
    videoUrl,
    views,
    caption,
    permalink: p.permalink || "",
  };
}

function normalizeFallback(list) {
  return (list || []).map((r, idx) => ({
    id: r.id || idx + 1,
    shortcode: r.shortcode || (r.permalink ? shortcodeFromUrl(r.permalink) : ""),
    thumbnail: r.thumbnail || "",
    videoUrl: r.videoUrl || r.video || "",
    views:
      typeof r.views === "number"
        ? formatCount(r.views)
        : typeof r.views === "string"
        ? r.views
        : undefined,
    caption: r.caption || "",
    permalink: r.permalink || INSTAGRAM_REELS_URL,
  }));
}

export async function getReels() {
  const feedUrl = process.env.BEHOLD_FEED_URL;
  if (!feedUrl) return normalizeFallback(REELS);

  try {
    // Har 1 ghante me cache revalidate hota hai (new reels auto appear)
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`Feed status ${res.status}`);

    const data = await res.json();
    const posts = Array.isArray(data) ? data : data.posts || [];

    // Prioritize video/reel posts
    const videoPosts = posts.filter((p) => p.isReel || p.mediaType === "VIDEO");
    const candidates = videoPosts.length > 0 ? videoPosts : posts;

    const reels = candidates.slice(0, MAX_REELS).map(normalizePost);

    return reels.length > 0 ? reels : normalizeFallback(REELS);
  } catch (err) {
    console.error("Instagram reels fetch failed:", err);
    return normalizeFallback(REELS);
  }
}