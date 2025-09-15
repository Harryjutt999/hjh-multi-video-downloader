import ytdl from "ytdl-core";

export default async function handler(req, res) {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "YouTube URL required" });

  try {
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: "Invalid YouTube URL" });
    }
    const info = await ytdl.getInfo(url);
    const format = ytdl.chooseFormat(info.formats, { quality: "18" }); // 360p mp4
    return res.status(200).json({ video: format.url });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
