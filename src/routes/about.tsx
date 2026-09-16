import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Gen12 | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Why Gen12 is free AI creation for everyone." },
      { property: "og:title", content: "About Gen12 | Gen12" },
      { property: "og:description", content: "Why Gen12 is free AI creation for everyone." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="About Gen12" description="Why Gen12 is free AI creation for everyone." />,
});
