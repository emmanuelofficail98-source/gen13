import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/creations")({
  head: () => ({
    meta: [
      { title: "My Creations | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Everything you have generated on Gen12." },
      { property: "og:title", content: "My Creations | Gen12" },
      { property: "og:description", content: "Everything you have generated on Gen12." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="My Creations" description="Everything you have generated on Gen12." />,
});
