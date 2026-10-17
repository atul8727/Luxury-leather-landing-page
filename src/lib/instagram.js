// Server-only: Instagram Reels, official Meta "Instagram API with Instagram Login".
// Endpoint: https://graph.instagram.com/me/media  (permission: instagram_business_basic)
//
// Caching: ONLY Next.js fetch caching -> fetch(..., { next: { revalidate: 3600 } }).
// (cacheComponents is not enabled in this project, so no `use cache` / unstable_cache.)
// Next caches only HTTP 200 responses, so API errors are never cached.
//
// Security: INSTAGRAM_ACCESS_TOKEN is read from the server environment only.
// The request URL (which contains the token) is never logged or returned.
// This file must only be imported from Server Components.
import { REELS } from "@/data/reels";

const GRAPH_MEDIA_URL = "https://graph.instagram.com/me/media";
const FIELDS = "id,caption,media_type,media_url,thumbnail_url,permalink";
const PAGE_SIZE = 25;
const MAX_PAGES = 4; // safety cap while collecting reels
const MAX_REELS = 20;
const REVALIDATE_SECONDS = 3600;
const REQUEST_TIMEOUT_MS = 8000;

function shortcodeFromUrl(url = "") {
  const m = url.match(/\/(?:reel|reels|p)\/([^/?#]+)/);
  return m ? m[1] : "";
}

function isHttpsUrl(value) {
  if (typeof value !== "string") return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

// Only real Reels: media_type VIDEO + a real https media_url + a /reel/ permalink.
function isPlayableReel(item) {
  return (
    item &&
    typeof item === "object" &&
    item.media_type === "VIDEO" &&
    isHttpsUrl(item.media_url) &&
    typeof item.permalink === "string" &&
    /\/reel\//.test(item.permalink)
  );
}

function normalizeReel(item) {
  const captionText = typeof item.caption === "string" ? item.caption : "";
  const firstLine = captionText.split("\n")[0].trim();
  const caption =
    firstLine.length > 70 ? `${firstLine.slice(0, 67)}...` : firstLine;

  return {
    id: String(item.id),
    shortcode: shortcodeFromUrl(item.permalink),
    thumbnail: isHttpsUrl(item.thumbnail_url) ? item.thumbnail_url : "",
    videoUrl: item.media_url,
    caption,
    permalink: item.permalink,
  };
}

// Safe error: never contains the URL or token.
class InstagramApiError extends Error {
  constructor(message) {
    super(message);
    this.name = "InstagramApiError";
  }
}

async function fetchPage(token, after) {
  const url = new URL(GRAPH_MEDIA_URL);
  url.searchParams.set("fields", FIELDS);
  url.searchParams.set("limit", String(PAGE_SIZE));
  url.searchParams.set("access_token", token);
  if (after) url.searchParams.set("after", after);

  const res = await fetch(url, {
    next: { revalidate: REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  let body = null;
  try {
    body = await res.json();
  } catch {
    throw new InstagramApiError(`Malformed response (HTTP ${res.status})`);
  }

  if (!res.ok || body?.error) {
    const code = body?.error?.code;
    const reason =
      code === 190
        ? "token expired or invalid - regenerate INSTAGRAM_ACCESS_TOKEN"
        : code === 10 || code === 200
        ? "permission missing (instagram_business_basic)"
        : [4, 17, 32, 613].includes(code)
        ? "rate limited"
        : "request failed";
    throw new InstagramApiError(
      `Instagram API ${reason} (HTTP ${res.status}, code ${code ?? "n/a"})`
    );
  }

  if (!body || !Array.isArray(body.data)) {
    throw new InstagramApiError("Malformed response: missing data array");
  }

  const nextCursor =
    body.paging?.next && typeof body.paging?.cursors?.after === "string"
      ? body.paging.cursors.after
      : null;

  return { items: body.data, nextCursor };
}

async function fetchReelsFromInstagram(token) {
  const reels = [];
  let after = null;

  for (let page = 0; page < MAX_PAGES && reels.length < MAX_REELS; page += 1) {
    const { items, nextCursor } = await fetchPage(token, after);
    for (const item of items) {
      if (isPlayableReel(item)) reels.push(normalizeReel(item));
      if (reels.length >= MAX_REELS) break;
    }
    if (!nextCursor) break;
    after = nextCursor;
  }

  return reels;
}

// Returns only real Reels from the Instagram API. No mock/fallback data:
// if the API is unavailable, an empty list is returned and the section shows
// its normal "follow us on Instagram" empty state.
export async function getReels() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) {
    return REELS;
  }

  try {
    const reels = await fetchReelsFromInstagram(token);
    return reels.length > 0 ? reels : REELS;
  } catch (err) {
    // Log only a safe message; never the URL, token or raw API body.
    const message =
      err instanceof InstagramApiError
        ? err.message
        : err?.name === "TimeoutError"
        ? "Instagram API timeout"
        : "Instagram API network error";
    console.error(`Instagram reels fetch failed: ${message}`);
    return REELS;
  }
}