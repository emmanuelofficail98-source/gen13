/**
 * Gen12 domain layer.
 *
 * All AI generation goes through this module. Today no model/API is connected,
 * so every generator returns a `demo` result that is clearly labelled in the UI.
 * To go live, implement the integration points below (server functions calling
 * your provider) and flip `isGenerationConfigured()` to true.
 */

export type ToolId =
  | "text-to-video"
  | "image-to-video"
  | "text-to-image"
  | "image-generator"
  | "video-editor"
  | "video-enhancer"
  | "voice"
  | "avatar";

export type CreationKind = "video" | "image" | "audio";

export interface Creation {
  id: string;
  kind: CreationKind;
  title: string;
  thumbnail: string;
  createdAt: string;
  tool: ToolId;
  demo: true;
}

export interface GenerationStage {
  label: string;
  ms: number;
}

export const VIDEO_STAGES: GenerationStage[] = [
  { label: "Preparing prompt", ms: 900 },
  { label: "Generating scene", ms: 1600 },
  { label: "Rendering video", ms: 1800 },
  { label: "Finalizing", ms: 900 },
];

export const IMAGE_STAGES: GenerationStage[] = [
  { label: "Preparing prompt", ms: 800 },
  { label: "Composing image", ms: 1400 },
  { label: "Upscaling", ms: 1000 },
  { label: "Finalizing", ms: 600 },
];

export const AUDIO_STAGES: GenerationStage[] = [
  { label: "Preparing script", ms: 700 },
  { label: "Synthesizing voice", ms: 1500 },
  { label: "Finalizing", ms: 700 },
];

/**
 * Returns true once a real AI provider has been wired into the server
 * functions below. Keep it false while Gen12 runs in demo mode.
 */
export function isGenerationConfigured(): boolean {
  return false;
}

export class GenerationNotConfiguredError extends Error {
  constructor(tool: ToolId) {
    super(`No AI model is connected for "${tool}" yet.`);
    this.name = "GenerationNotConfiguredError";
  }
}

/* ------------------------------------------------------------------ *
 * API integration points — replace the bodies with real server calls. *
 * ------------------------------------------------------------------ */

export interface TextToVideoInput {
  prompt: string;
  aspectRatio: string;
  duration: string;
  style: string;
  camera: string;
}

export interface ImageToVideoInput extends Omit<TextToVideoInput, "camera"> {
  camera: string;
  imageName: string;
  motionStrength: number;
}

export interface TextToImageInput {
  prompt: string;
  aspectRatio: string;
  style: string;
}

export interface VoiceInput {
  script: string;
  voice: string;
  language: string;
}

export interface AvatarInput {
  script: string;
  presenter: string;
  aspectRatio: string;
}

export type GenerationResult =
  | { status: "demo"; kind: CreationKind; asset: string; note: string }
  | { status: "ready"; kind: CreationKind; asset: string };

const DEMO_NOTE =
  "Demo preview — no AI model is connected to Gen12 yet. Wire a provider in src/lib/gen12.ts to render real output.";

async function demo(kind: CreationKind, asset: string): Promise<GenerationResult> {
  return { status: "demo", kind, asset, note: DEMO_NOTE };
}

export const generateTextToVideo = (_input: TextToVideoInput, asset: string) =>
  demo("video", asset);
export const generateImageToVideo = (_input: ImageToVideoInput, asset: string) =>
  demo("video", asset);
export const generateTextToImage = (_input: TextToImageInput, asset: string) =>
  demo("image", asset);
export const generateVoice = (_input: VoiceInput, asset: string) => demo("audio", asset);
export const generateAvatar = (_input: AvatarInput, asset: string) => demo("video", asset);

/* ------------------------------- options ------------------------------- */

export const ASPECT_RATIOS = ["16:9", "9:16", "1:1"];
export const DURATIONS = ["5 seconds", "10 seconds", "15 seconds"];
export const VIDEO_STYLES = [
  "Realistic",
  "Cinematic",
  "Documentary",
  "Anime",
  "3D",
  "Animation",
  "Fantasy",
  "Sci-Fi",
];
export const CAMERA_MOTIONS = [
  "Static",
  "Slow Zoom",
  "Pan",
  "Tracking",
  "Drone",
  "Handheld",
  "Cinematic",
];
export const IMAGE_STYLES = [
  "Realistic",
  "Cinematic",
  "Illustration",
  "3D",
  "Anime",
  "Fantasy",
  "Product photography",
];
