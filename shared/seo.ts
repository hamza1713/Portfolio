import { getProject, profile, projects } from "./portfolio";
export const publicRoutes = ["/", ...projects.map(p => `/projects/${p.slug}`)];
export function getPageMetadata(pathname: string) {
  const path = pathname.replace(/\/$/, "") || "/";
  const project = getProject(path.split("/")[2] ?? "");
  if (project && path === `/projects/${project.slug}`)
    return {
      title: `${project.title} — ${profile.name} · AI Engineering`,
      description: project.description,
      image: `/assets/projects/${project.slug}-share.jpg`,
      path,
      noindex: false,
    };
  if (path === "/")
    return {
      title: `${profile.name} — GenAI / AI-ML Engineer`,
      description:
        "Explore Hamza Ali’s RAG systems, AI agents, and evaluation workflows through real demos, case studies, and interactive architecture examples.",
      image: "/assets/og-image.jpg",
      path,
      noindex: false,
    };
  return {
    title: `${path === "/admin" ? "Owner dashboard" : path === "/thank-you" ? "Inquiry received" : "Page not found"} — ${profile.name}`,
    description: "Hamza Ali’s AI engineering portfolio.",
    image: "/assets/og-image.jpg",
    path,
    noindex: true,
  };
}
