import TikTokScraper from "tiktok-scraper";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "TikTok URL required" });

  try {
    const videoMeta = await TikTokScraper.getVideoMeta(url);
    const videoUrl = videoMeta.collector[0]?.videoUrl;
    if (videoUrl) {
      return res.status(200).json({ video: videoUrl });
    }
    return res.status(404).json({ error: "No video found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
