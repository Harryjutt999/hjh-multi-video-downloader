import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("tiktok");
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleFetch() {
    setLoading(true);
    setVideoUrl(null);

    const res = await fetch("/api/fetch-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, platform }),
    });

    const data = await res.json();
    setLoading(false);

    if (data.videoUrl) setVideoUrl(data.videoUrl);
    else alert("Video not found!");
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>HJH Multi Video Downloader</h1>
      <p style={{ color: "gray" }}>
        TikTok • YouTube • Instagram • Facebook • Snapchat • Pinterest
      </p>

      <select onChange={(e) => setPlatform(e.target.value)} value={platform}>
        <option value="tiktok">TikTok</option>
        <option value="youtube">YouTube</option>
        <option value="instagram">Instagram</option>
        <option value="facebook">Facebook</option>
        <option value="snapchat">Snapchat</option>
        <option value="pinterest">Pinterest</option>
      </select>

      <br />
      <input
        type="text"
        placeholder="Paste video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "300px", margin: "10px", padding: "8px" }}
      />
      <br />
      <button onClick={handleFetch} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Video"}
      </button>

      {videoUrl && (
        <div>
          <video
            src={videoUrl}
            controls
            style={{ width: "100%", marginTop: "20px", borderRadius: "10px" }}
          />
          <br />
          <a
            href={videoUrl}
            download="video.mp4"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 20px",
              background: "#00cfff",
              color: "white",
              borderRadius: "5px",
              textDecoration: "none",
            }}
          >
            ⬇ Download
          </a>
        </div>
      )}
    </div>
  );
}
