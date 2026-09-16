import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "How Gen12 handles your data." },
      { property: "og:title", content: "Privacy | Gen12" },
      { property: "og:description", content: "How Gen12 handles your data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Privacy" description="How Gen12 handles your data." />,
});
