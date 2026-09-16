import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Sign in to save your Gen12 creations." },
      { property: "og:title", content: "Sign in | Gen12" },
      { property: "og:description", content: "Sign in to save your Gen12 creations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Sign in" description="Sign in to save your Gen12 creations." />,
});
