import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "The terms of using Gen12." },
      { property: "og:title", content: "Terms | Gen12" },
      { property: "og:description", content: "The terms of using Gen12." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Terms" description="The terms of using Gen12." />,
});
