import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/video/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) return new Response("AI is not configured", { status: 500 });
        const res = await fetch(
          `https://ai.gateway.lovable.dev/v1/videos/${params.id}/content`,
          { headers: { Authorization: `Bearer ${key}` } },
        );
        if (!res.ok || !res.body) {
          return new Response("Video is not available", { status: res.status || 502 });
        }
        return new Response(res.body, {
          status: 200,
          headers: {
            "content-type": "video/mp4",
            "cache-control": "private, max-age=3600",
          },
        });
      },
    },
  },
});
