import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Guides and answers for using Gen12." },
      { property: "og:title", content: "Help | Gen12" },
      { property: "og:description", content: "Guides and answers for using Gen12." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Help" description="Guides and answers for using Gen12." />,
});
