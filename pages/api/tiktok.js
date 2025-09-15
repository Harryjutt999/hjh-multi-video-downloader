export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "TikTok URL is required" });
  }

  try {
    const apiUrl = `https://www.tikwm.com/api/?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.data && data.data.play) {
      return res.status(200).json({ video: data.data.play });
    } else {
      return res.status(404).json({ error: "No video found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed: " + err.message });
  }
}
