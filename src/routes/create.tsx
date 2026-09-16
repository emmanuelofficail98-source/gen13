import { createFileRoute } from "@tanstack/react-router";
import { StudioPlaceholder } from "@/components/gen12/StudioPlaceholder";

export const Route = createFileRoute("/create")({
  head: () => ({
    meta: [
      { title: "Create | Gen12 — Free AI Creative Studio" },
      { name: "description", content: "Pick a tool and start creating — everything on Gen12 is free." },
      { property: "og:title", content: "Create | Gen12" },
      { property: "og:description", content: "Pick a tool and start creating — everything on Gen12 is free." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <StudioPlaceholder title="Create" description="Pick a tool and start creating — everything on Gen12 is free." />,
});
