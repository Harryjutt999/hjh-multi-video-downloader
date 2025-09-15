import instagramGetUrl from "instagram-url-direct";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Instagram URL is required" });
  }

  try {
    const result = await instagramGetUrl(url);
    if (!result.url_list || result.url_list.length === 0) {
      return res.status(404).json({ error: "No video found" });
    }
    return res.status(200).json({ video: result.url_list[0] });
  } catch (err) {
    return res.status(500).json({ error: "Failed: " + err.message });
  }
}
