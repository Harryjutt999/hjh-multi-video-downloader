import { useState } from "react";

export default function Home() {
  const [platform, setPlatform] = useState("instagram");
  const [url, setUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchVideo = async () => {
    if (!url) {
      alert("Please enter a video URL");
      return;
    }

    setLoading(true);
    setVideoUrl("");

    try {
      const res = await fetch(`/api/${platform}?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (res.ok && data.video) {
        setVideoUrl(data.video);
      } else {
        alert(data.error || "Failed to fetch video");
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching video. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0015",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          margin: "20px",
          padding: "25px",
          width: "90%",
          maxWidth: "420px",
          borderRadius: "15px",
          background: "#0d001a",
          boxShadow: "0 0 20px #00cfff",
          textAlign: "center",
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        {/* Avatar */}
        <div
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            margin: "0 auto 15px",
            overflow: "hidden",
            border: "2px solid #00cfff",
            boxShadow: "0 0 15px #00cfff",
          }}
        >
          <img
            src="/avatar.jpg"
            alt="avatar"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <h1 style={{ color: "#00cfff", fontSize: "22px", marginBottom: "10px" }}>
          𝑯𝑱𝑯 𝑴𝒖𝒍𝒕𝒊 𝑽𝒊𝒅𝒆𝒐 𝑫𝒐𝒘𝒏𝒍𝒐𝒂𝒅𝒆𝒓
        </h1>
        <span style={{ fontSize: "13px", color: "gray", marginBottom: "12px" }}>
          TikTok • YouTube • Instagram • Facebook
        </span>

        {/* Platform select */}
        <label
          htmlFor="platformSelect"
          style={{ display: "block", fontSize: "14px", margin: "10px 0 8px", color: "#00cfff" }}
        >
          𝘊𝘩𝘰𝘰𝘴𝘦 𝘗𝘭𝘢𝘵𝘧𝘰𝘳𝘮
        </label>
        <select
          id="platformSelect"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          style={{
            width: "85%",
            maxWidth: "320px",
            padding: "10px",
            marginBottom: "12px",
            border: "2px solid #00cfff",
            borderRadius: "8px",
            background: "#000",
            color: "#fff",
            fontSize: "15px",
            textAlign: "center",
          }}
        >
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
          <option value="instagram">Instagram</option>
          <option value="facebook">Facebook</option>
        </select>

        {/* URL input */}
        <label
          htmlFor="urlInput"
          style={{ display: "block", fontSize: "14px", margin: "10px 0 8px", color: "#00cfff" }}
        >
          𝘗𝘢𝘴𝘵𝘦 𝘝𝘪𝘥𝘦𝘰 𝘜𝘙𝘓
        </label>
        <input
          id="urlInput"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          style={{
            width: "85%",
            maxWidth: "320px",
            padding: "10px",
            marginBottom: "12px",
            border: "2px solid #00cfff",
            borderRadius: "8px",
            background: "#000",
            color: "#fff",
            textAlign: "center",
          }}
        />

        {/* Fetch button */}
        <button
          onClick={fetchVideo}
          disabled={loading}
          style={{
            display: "block",
            width: "85%",
            maxWidth: "320px",
            margin: "10px auto",
            padding: "12px",
            background: "#00cfff",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "25px",
            cursor: "pointer",
          }}
        >
          {loading ? "Fetching..." : "🎬 Fetch Video"}
        </button>

        {/* Video + Download */}
        {videoUrl && (
          <>
            <video
              src={videoUrl}
              controls
              style={{
                width: "100%",
                borderRadius: "12px",
                marginTop: "12px",
                boxShadow: "0 0 15px #00cfff",
              }}
            />
            <a
              href={videoUrl}
              download={`${platform}-video.mp4`}
              style={{
                display: "block",
                width: "85%",
                maxWidth: "320px",
                margin: "10px auto",
                padding: "12px",
                background: "transparent",
                border: "2px solid #00cfff",
                borderRadius: "25px",
                color: "#00cfff",
                fontSize: "16px",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              ⬇ Download
            </a>
          </>
        )}

        <div style={{ marginTop: "18px", fontSize: "13px", color: "gray" }}>
          Developed by{" "}
          <span style={{ color: "#00cfff", fontWeight: "bold" }}>
            ▄︻┻═┳一𝐇𝐉𝐇 𝐇𝐀𝐂𝐊𝐄𝐑🔥
          </span>
        </div>
      </div>
    </div>
  );
  }
