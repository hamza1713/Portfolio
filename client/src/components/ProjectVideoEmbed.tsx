import { AlertCircle, Film, PlayCircle, Video } from "lucide-react";
import { useState } from "react";

function formatEmbedUrl(url: string): { type: "iframe" | "video"; embedUrl: string } {
  const trimmed = url.trim();

  // 1. YouTube
  if (trimmed.includes("youtube.com") || trimmed.includes("youtu.be")) {
    let videoId = "";
    if (trimmed.includes("youtu.be/")) {
      videoId = trimmed.split("youtu.be/")[1]?.split(/[?#]/)[0] ?? "";
    } else if (trimmed.includes("watch?v=")) {
      videoId = trimmed.split("watch?v=")[1]?.split(/[&#]/)[0] ?? "";
    } else if (trimmed.includes("/embed/")) {
      videoId = trimmed.split("/embed/")[1]?.split(/[?#]/)[0] ?? "";
    }
    if (videoId) {
      return { type: "iframe", embedUrl: `https://www.youtube.com/embed/${videoId}?rel=0` };
    }
  }

  // 2. Loom
  if (trimmed.includes("loom.com")) {
    return {
      type: "iframe",
      embedUrl: trimmed.includes("/share/") ? trimmed.replace("/share/", "/embed/") : trimmed,
    };
  }

  // 3. Vimeo
  if (trimmed.includes("vimeo.com")) {
    const vimeoId = trimmed.split("vimeo.com/")[1]?.split(/[?#]/)[0] ?? "";
    if (vimeoId && !trimmed.includes("player.vimeo.com")) {
      return { type: "iframe", embedUrl: `https://player.vimeo.com/video/${vimeoId}` };
    }
    return { type: "iframe", embedUrl: trimmed };
  }

  // 4. Direct video file (local or cloud mp4 / webm)
  return { type: "video", embedUrl: trimmed };
}

interface ProjectVideoEmbedProps {
  title: string;
  videoUrl?: string | null;
  /** Backwards compatibility with previous loomUrl prop */
  loomUrl?: string | null;
  /** Suggested local file name for the placeholder hint */
  fallbackFilename?: string;
}

export function ProjectVideoEmbed({
  title,
  videoUrl,
  loomUrl,
  fallbackFilename,
}: ProjectVideoEmbedProps) {
  const activeUrl = videoUrl || loomUrl || null;
  const [hasError, setHasError] = useState(false);

  if (activeUrl && !hasError) {
    const { type, embedUrl } = formatEmbedUrl(activeUrl);

    if (type === "video") {
      return (
        <div className="project-video project-video--active">
          <video
            src={embedUrl}
            controls
            playsInline
            preload="metadata"
            style={{ width: "100%", aspectRatio: "16 / 9", display: "block", background: "#0a0f0d" }}
            onError={() => setHasError(true)}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    return (
      <div className="project-video project-video--active">
        <iframe
          src={embedUrl}
          title={`${title} walkthrough`}
          allowFullScreen
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        />
      </div>
    );
  }

  const expectedFile = fallbackFilename ?? `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-demo.mp4`;

  return (
    <div className="project-video project-video--placeholder">
      {hasError ? <AlertCircle size={19} className="text-amber-500" /> : <Film size={19} />}
      <div>
        <span>{hasError ? "VIDEO NOT FOUND YET" : "WALKTHROUGH READY"}</span>
        <strong>{title} demo walkthrough</strong>
        <p>
          {hasError
            ? `Place ${expectedFile} in client/public/videos/ or paste a YouTube/cloud URL to activate.`
            : `Add your Gemini-generated video as client/public/videos/${expectedFile} or paste a video link.`}
        </p>
      </div>
      <PlayCircle size={22} />
    </div>
  );
}
