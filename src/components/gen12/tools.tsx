import { Link } from "@tanstack/react-router";
import {
  Film,
  Image as ImageIcon,
  Mic,
  Scissors,
  Sparkles,
  UserSquare2,
  Video,
  Wand2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FreeBadge } from "./studio-ui";

export interface ToolDef {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  to: "/video" | "/image-video" | "/image" | "/voice" | "/avatar" | "/tools";
  cta: string;
}

export const PRIMARY_TOOLS: ToolDef[] = [
  {
    title: "Text to Video",
    description: "Turn your ideas into cinematic AI videos.",
    icon: Video,
    to: "/video",
    cta: "Create Video",
  },
  {
    title: "Image to Video",
    description: "Animate your images and bring them to life.",
    icon: Film,
    to: "/image-video",
    cta: "Animate Image",
  },
];

export const MORE_TOOLS: ToolDef[] = [
  {
    title: "Text to Image",
    description: "Generate images from text prompts.",
    icon: ImageIcon,
    to: "/image",
    cta: "Generate Image",
  },
  {
    title: "Image Generator",
    description: "Create realistic, artistic, cinematic and creative images.",
    icon: Sparkles,
    to: "/image",
    cta: "Open Generator",
  },
  {
    title: "AI Video Editor",
    description: "Edit and transform generated videos.",
    icon: Scissors,
    to: "/tools",
    cta: "Open Editor",
  },
  {
    title: "Video Enhancer",
    description: "Improve video quality and resolution.",
    icon: Wand2,
    to: "/tools",
    cta: "Enhance Video",
  },
  {
    title: "AI Voice",
    description: "Generate natural AI voices from text.",
    icon: Mic,
    to: "/voice",
    cta: "Create Voice",
  },
  {
    title: "AI Avatar",
    description: "Create videos using AI presenters and avatars.",
    icon: UserSquare2,
    to: "/avatar",
    cta: "Create Avatar",
  },
];

export function PrimaryToolCard({ tool }: { tool: ToolDef }) {
  const Icon = tool.icon;
  return (
    <div className="glass group relative overflow-hidden rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
      <div className="halo pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-60" />
      <div className="relative">
        <div className="flex items-start justify-between">
          <span className="bg-brand flex size-12 items-center justify-center rounded-2xl">
            <Icon className="size-5 text-primary-foreground" />
          </span>
          <FreeBadge />
        </div>
        <h3 className="mt-6 text-xl font-semibold">{tool.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{tool.description}</p>
        <Button asChild variant="hero" className="mt-6">
          <Link to={tool.to}>{tool.cta}</Link>
        </Button>
      </div>
    </div>
  );
}

export function ToolCard({ tool }: { tool: ToolDef }) {
  const Icon = tool.icon;
  return (
    <Link
      to={tool.to}
      className="glass group flex flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
    >
      <div className="flex items-start justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary/20">
          <Icon className="size-4 text-accent" />
        </span>
        <FreeBadge />
      </div>
      <h3 className="mt-4 font-semibold">{tool.title}</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">{tool.description}</p>
    </Link>
  );
}
