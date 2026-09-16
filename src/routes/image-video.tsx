import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/image-video")({
  head: () => ({
    meta: [
      { title: "Image to Video | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Animate a still image into a short video clip." },
      { property: "og:title", content: "Image to Video | Gen12" },
      { property: "og:description", content: "Animate a still image into a short video clip." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Image to Video" description="Animate a still image into a short video clip." />,
});
