export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, platform } = req.body;
  const APIFY_TOKEN = process.env.APIFY_TOKEN; // Vercel env variable

  const actorMap = {
    tiktok: "scraper-mind~tiktok-video-downloader",
    youtube: "scrapearchitect~youtube-long-video-downloader",
    instagram: "scraper-mind~instagram-video-downloader",
    facebook: "scraper-mind~facebook-video-downloader",
    snapchat: "scraper-mind~snapchat-video-downloader",
    pinterest: "scraper-mind~pinterest-video-downloader",
  };

  try {
    const actorId = actorMap[platform];
    const apiUrl = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "API call failed" });
    }

    const data = await response.json();
    const videoUrl = data?.[0]?.videoUrl || data?.[0]?.url;

    res.status(200).json({ videoUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
