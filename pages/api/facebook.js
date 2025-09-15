export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: "Facebook URL is required" });
  }

  try {
    const apiUrl = `https://api.fdownloader.net/api/v2/facebook?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.video && data.video.length > 0) {
      return res.status(200).json({ video: data.video[0].url });
    } else {
      return res.status(404).json({ error: "No video found" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Failed: " + err.message });
  }
}
