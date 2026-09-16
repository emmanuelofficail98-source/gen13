import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Video Tools | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Enhance, upscale and edit your clips." },
      { property: "og:title", content: "Video Tools | Gen12" },
      { property: "og:description", content: "Enhance, upscale and edit your clips." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Video Tools" description="Enhance, upscale and edit your clips." />,
});
