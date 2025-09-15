import { facebook } from "fb-downloader-scraper";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "Facebook URL required" });

  try {
    const result = await facebook(url);
    if (result?.hd) {
      return res.status(200).json({ video: result.hd });
    } else if (result?.sd) {
      return res.status(200).json({ video: result.sd });
    }
    return res.status(404).json({ error: "No video found" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
