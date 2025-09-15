import fbvid from "fb-video-downloader";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Facebook URL required" });

  try {
    const result = await fbvid(url);

    if (result?.sd) {
      return res.status(200).json({ video: result.sd });
    } else if (result?.hd) {
      return res.status(200).json({ video: result.hd });
    }

    return res.status(404).json({ error: "No video found at this URL" });
  } catch (err) {
    console.error("Facebook API Error:", err);
    return res.status(500).json({ error: "Failed to fetch Facebook video" });
  }
}
