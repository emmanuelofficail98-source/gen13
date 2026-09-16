import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/voice")({
  head: () => ({
    meta: [
      { title: "AI Voice | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Turn a script into natural-sounding narration." },
      { property: "og:title", content: "AI Voice | Gen12" },
      { property: "og:description", content: "Turn a script into natural-sounding narration." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="AI Voice" description="Turn a script into natural-sounding narration." />,
});
