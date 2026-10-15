import InstagramReels from "./InstagramReels";
import { getReels } from "@/lib/instagram";

// Server component: reels fetch karke client carousel ko deta hai.
export default async function InstagramReelsFeed() {
  const items = await getReels();
  return <InstagramReels items={items} />;
}