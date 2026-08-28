import { PlayCircle, Video } from "lucide-react";

function toLoomEmbedUrl(url: string) {
  return url.includes("/share/") ? url.replace("/share/", "/embed/") : url;
}

export function ProjectVideoEmbed({ title, loomUrl }: { title: string; loomUrl: string | null }) {
  if (loomUrl) {
    return (
      <div className="project-video project-video--active">
        <iframe src={toLoomEmbedUrl(loomUrl)} title={`${title} Loom walkthrough`} allowFullScreen allow="fullscreen" />
      </div>
    );
  }

  return (
    <div className="project-video project-video--placeholder">
      <Video size={19} />
      <div><span>LOOM WALKTHROUGH / READY</span><strong>{title} walkthrough goes here.</strong><p>Paste the Loom share URL into the project video configuration to activate this embed.</p></div>
      <PlayCircle size={22} />
    </div>
  );
}
