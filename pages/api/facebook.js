export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: "Facebook URL is required" });
  }

  try {
    // 👇 External API use kar rahe hain (fbdown.net unofficial API)
    const apiUrl = `https://fbdownloader.vercel.app/api?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data || !data.video) {
      return res.status(404).json({ error: "No video found at this URL" });
    }

    return res.status(200).json({ video: data.video });
  } catch (err) {
    console.error("Facebook error:", err);
    return res.status(500).json({ error: "Failed to fetch Facebook video" });
  }
}
