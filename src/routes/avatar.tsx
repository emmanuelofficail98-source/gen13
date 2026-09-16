import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/avatar")({
  head: () => ({
    meta: [
      { title: "AI Avatar | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Create a talking presenter from a script." },
      { property: "og:title", content: "AI Avatar | Gen12" },
      { property: "og:description", content: "Create a talking presenter from a script." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="AI Avatar" description="Create a talking presenter from a script." />,
});
