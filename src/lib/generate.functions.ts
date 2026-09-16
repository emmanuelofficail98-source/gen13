import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1";

function apiKey() {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI is not configured yet.");
  return key;
}

async function gatewayError(res: Response, fallback: string) {
  const body = (await res.json().catch(() => null)) as
    | { message?: string; error?: { message?: string } }
    | null;
  return new Error(body?.message ?? body?.error?.message ?? fallback);
}

const ImageInput = z.object({
  prompt: z.string().min(3).max(4000),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]).default("1:1"),
  style: z.string().max(80).optional(),
});

const IMAGE_SIZE: Record<string, string> = {
  "16:9": "1536x1024",
  "9:16": "1024x1536",
  "1:1": "1024x1024",
};

export const generateImage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ImageInput.parse(input))
  .handler(async ({ data }) => {
    const prompt = data.style ? `${data.prompt}. Style: ${data.style}.` : data.prompt;
    const res = await fetch(`${GATEWAY}/images/generations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-image-2.5-sunburst",
        prompt,
        n: 1,
        size: IMAGE_SIZE[data.aspectRatio] ?? "1024x1024",
      }),
    });
    if (!res.ok) throw await gatewayError(res, "Image generation failed.");
    const json = (await res.json()) as { data?: { b64_json?: string; url?: string }[] };
    const first = json.data?.[0];
    if (first?.b64_json) return { url: `data:image/png;base64,${first.b64_json}` };
    if (first?.url) return { url: first.url };
    throw new Error("The image service returned no image.");
  });

const VideoInput = z.object({
  prompt: z.string().min(3).max(3000),
  aspectRatio: z.enum(["16:9", "9:16"]).default("16:9"),
  seconds: z.number().int().min(3).max(10).default(8),
  style: z.string().max(80).optional(),
  resolution: z.enum(["360p", "720p"]).default("720p"),
});

export const startVideo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => VideoInput.parse(input))
  .handler(async ({ data }) => {
    const prompt = data.style
      ? `${data.prompt}. Visual style: ${data.style}. In a single continuous shot.`
      : `${data.prompt}. In a single continuous shot.`;
    const res = await fetch(`${GATEWAY}/videos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-omni-1.1-flash",
        input: prompt,
        response_format: {
          type: "video",
          resolution: data.resolution,
          duration: `${data.seconds}s`,
          aspect_ratio: data.aspectRatio,
        },
      }),
    });
    if (!res.ok) throw await gatewayError(res, "Video generation could not be started.");
    const job = (await res.json()) as { id: string; status: string };
    return { id: job.id, status: job.status };
  });

export const checkVideo = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const res = await fetch(`${GATEWAY}/videos/${data.id}`, {
      headers: { Authorization: `Bearer ${apiKey()}` },
    });
    if (!res.ok) throw await gatewayError(res, "Could not check the video status.");
    const job = (await res.json()) as {
      id: string;
      status: string;
      progress?: number;
      error?: { message?: string };
    };
    return {
      id: job.id,
      status: job.status,
      progress: job.progress ?? 0,
      error: job.error?.message ?? null,
      url: job.status === "completed" ? `/api/video/${job.id}` : null,
    };
  });
