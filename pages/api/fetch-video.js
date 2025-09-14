// pages/api/fetch-video.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url, platform } = req.body || {};
  const APIFY_TOKEN = process.env.APIFY_TOKEN;

  // Basic checks
  if (!APIFY_TOKEN) return res.status(500).json({ error: "APIFY_TOKEN not set on server" });
  if (!url) return res.status(400).json({ error: "Missing 'url' in request body" });
  if (!platform) return res.status(400).json({ error: "Missing 'platform' in request body" });

  const actorMap = {
    tiktok: "scraper-mind/tiktok-video-downloader",
    youtube: "youtubemasters/youtube-downloader-stable",
    instagram: "apilabs/instagram-downloader",
    facebook: "scrapearchitect/facebook-video-downloader",
    snapchat: "scraper-mind/snapchat-video-downloader",
    pinterest: "easyapi/pinterest-video-downloader",
  };

  const actorId = actorMap[platform];
  if (!actorId) return res.status(400).json({ error: "Unsupported platform" });

  const apiUrl = `https://api.apify.com/v2/acts/${actorId}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`;

  try {
    const resp = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const body = await resp.json().catch(() => null);

    // If Apify returned non-2xx, forward the message to help debug
    if (!resp.ok) {
      // Try to return helpful info from Apify's error response
      return res.status(resp.status).json({
        error: "Apify API returned an error",
        status: resp.status,
        apifyBody: body || "No JSON body"
      });
    }

    // body is usually an array of items from dataset
    const first = Array.isArray(body) ? body[0] : body?.data?.items?.[0] || null;
    const videoUrl = first?.videoUrl || first?.url || first?.downloadUrl || null;

    if (!videoUrl) {
      return res.status(502).json({
        error: "No video URL found in actor output",
        actorOutputSample: first || body
      });
    }

    return res.status(200).json({ videoUrl });
  } catch (err) {
    console.error("Fetch error:", err);
    return res.status(500).json({ error: "Server error: " + err.message });
  }
    }
