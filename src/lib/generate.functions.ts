import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Free generation through Pollinations (https://gen.pollinations.ai).
// Needs one environment variable: POLLINATIONS_API_KEY (free key from enter.pollinations.ai).
// Optional: POLLINATIONS_IMAGE_MODEL (default "flux").
const GEN = "https://gen.pollinations.ai";

function apiKey() {
  const key = process.env["POLLINATIONS_API_KEY"];
  if (!key) throw new Error("AI is not configured yet.");
  return key;
}

async function readError(res: Response, fallback: string) {
  const text = await res.text().catch(() => "");
  const short = text && text.length < 200 ? text : "";
  return new Error(short || `${fallback} (${res.status})`);
}

/* ---------------- Text to image ---------------- */

const ImageInput = z.object({
  prompt: z.string().min(3).max(4000),
  aspectRatio: z.enum(["16:9", "9:16", "1:1"]).default("1:1"),
  style: z.string().max(80).optional(),
});

const IMAGE_SIZE: Record<string, [number, number]> = {
  "16:9": [1280, 720],
  "9:16": [720, 1280],
  "1:1": [1024, 1024],
