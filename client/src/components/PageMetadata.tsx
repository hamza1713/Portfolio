import { useEffect } from "react";
import { useLocation } from "wouter";
import { getPageMetadata } from "@shared/seo";
export function PageMetadata() {
  const [location] = useLocation();
  useEffect(() => {
    const meta = getPageMetadata(location);
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    const configured = import.meta.env.VITE_SITE_URL;
    const origin =
      configured ||
      (canonical ? new URL(canonical.href).origin : window.location.origin);
    document.title = meta.title;
    const setMeta = (key: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let node = document.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`
      );
      if (!node) {
        node = document.createElement("meta");
        node.setAttribute(attribute, key);
        document.head.appendChild(node);
      }
      node.content = content;
    };
    setMeta("description", meta.description);
    setMeta("robots", meta.noindex ? "noindex, nofollow" : "index, follow");
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:url", new URL(meta.path, origin).href, true);
    setMeta("og:image", new URL(meta.image, origin).href, true);
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", new URL(meta.image, origin).href);
    const link = canonical ?? document.createElement("link");
    link.rel = "canonical";
    link.href = new URL(meta.path, origin).href;
    if (!canonical) document.head.appendChild(link);
  }, [location]);
  return null;
}
