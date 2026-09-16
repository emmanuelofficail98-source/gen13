import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "See what the Gen12 community is creating." },
      { property: "og:title", content: "Explore | Gen12" },
      { property: "og:description", content: "See what the Gen12 community is creating." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Explore" description="See what the Gen12 community is creating." />,
});
