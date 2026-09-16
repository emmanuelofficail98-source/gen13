import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Your Gen12 account." },
      { property: "og:title", content: "Profile | Gen12" },
      { property: "og:description", content: "Your Gen12 account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Profile" description="Your Gen12 account." />,
});
