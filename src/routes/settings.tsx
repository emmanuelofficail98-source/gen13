import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Manage your Gen12 preferences." },
      { property: "og:title", content: "Settings | Gen12" },
      { property: "og:description", content: "Manage your Gen12 preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Settings" description="Manage your Gen12 preferences." />,
});
