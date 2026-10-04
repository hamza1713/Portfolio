import { useState } from "react";
import { Play, Film } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function embedUrl(url: string) {
  if (url.startsWith("/") && !url.startsWith("//")) return { video: true, url };
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") return null;
    if (
      parsed.hostname === "youtu.be" ||
      parsed.hostname === "www.youtube.com" ||
      parsed.hostname === "youtube.com"
    ) {
      const id =
        parsed.hostname === "youtu.be"
          ? parsed.pathname.slice(1)
          : parsed.searchParams.get("v") || parsed.pathname.split("/").pop();
      return {
        video: false,
        url: `https://www.youtube-nocookie.com/embed/${id}`,
      };
    }
    if (parsed.hostname === "loom.com" || parsed.hostname === "www.loom.com")
      return { video: false, url: url.replace("/share/", "/embed/") };
    if (parsed.hostname === "vimeo.com")
      return {
        video: false,
        url: `https://player.vimeo.com/video/${parsed.pathname.slice(1)}`,
      };
    return { video: true, url };
  } catch {
    return null;
  }
}
export function ProjectVideoEmbed({
  title,
  videoUrl,
  loomUrl,
  poster,
  compact = false,
}: {
  title: string;
  videoUrl?: string | null;
  loomUrl?: string | null;
  poster?: string;
  compact?: boolean;
  fallbackFilename?: string;
}) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const source = embedUrl(videoUrl || loomUrl || "");
  if (!source)
    return (
      <p className="media-unavailable">
        <Film size={17} /> Walkthrough unavailable. Explore the case study and
        source code.
      </p>
    );
  return (
    <Dialog
      open={open}
      onOpenChange={value => {
        if (value) setError(false);
        setOpen(value);
      }}
    >
      <DialogTrigger asChild>
        <button className={compact ? "video-link" : "video-poster"}>
          {!compact && poster && (
            <img
              src={poster}
              width={1280}
              height={720}
              loading="lazy"
              alt={`${title} walkthrough preview`}
            />
          )}
          <span>
            <Play size={compact ? 15 : 22} fill="currentColor" />
            {compact ? "Watch demo" : `Watch the ${title} walkthrough`}
          </span>
        </button>
      </DialogTrigger>
      <DialogContent className="video-dialog">
        <DialogTitle>{title} · product walkthrough</DialogTitle>
        <DialogDescription>
          Recorded from the project. Use the playback controls to explore at
          your own pace.
        </DialogDescription>
        {open &&
          (error ? (
            <p role="alert" className="media-unavailable">
              This recording could not be loaded. You can still read the case
              study and explore the repository.
            </p>
          ) : source.video ? (
            <video
              src={source.url}
              poster={poster}
              controls
              playsInline
              autoPlay
              preload="none"
              aria-label={`${title} recorded walkthrough`}
              onError={() => setError(true)}
            >
              Your browser does not support video playback.
            </video>
          ) : (
            <iframe
              src={source.url}
              title={`${title} recorded walkthrough`}
              allow="fullscreen; picture-in-picture"
              allowFullScreen
            />
          ))}
      </DialogContent>
    </Dialog>
  );
}
