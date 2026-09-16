import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";
import { Download, Loader2, Sparkles, Video as VideoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StudioShell } from "@/components/gen12/StudioShell";
import { FreeBadge, OptionGroup, PageHeading } from "@/components/gen12/studio-ui";
import { checkVideo, startVideo } from "@/lib/generate.functions";
import { VIDEO_STYLES } from "@/lib/gen12";

export const Route = createFileRoute("/video")({
  head: () => ({
    meta: [
      { title: "Text to Video — Free AI Video Generator | Gen12" },
      {
        name: "description",
        content:
          "Turn a written idea into a short AI video with sound. Free on Gen12, no subscription required.",
      },
      { property: "og:title", content: "Text to Video — Free AI Video Generator | Gen12" },
      {
        property: "og:description",
        content: "Describe a scene and Gen12 generates the video for free.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TextToVideo,
});

const RATIOS = ["16:9", "9:16"] as const;
const LENGTHS = ["5 seconds", "8 seconds", "10 seconds"] as const;
const QUALITY = ["Draft (fast)", "HD"] as const;

function TextToVideo() {
  const start = useServerFn(startVideo);
  const check = useServerFn(checkVideo);

  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState<string>("16:9");
  const [length, setLength] = useState<string>("8 seconds");
  const [quality, setQuality] = useState<string>("HD");
  const [style, setStyle] = useState<string>("Cinematic");

  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const cancelled = useRef(false);

  useEffect(() => () => void (cancelled.current = true), []);

  const run = async () => {
    if (prompt.trim().length < 3 || running) return;
    setRunning(true);
    setError(null);
    setVideoUrl(null);
    setProgress(5);
    try {
      const job = await start({
        data: {
          prompt: prompt.trim(),
          aspectRatio: ratio as "16:9" | "9:16",
          seconds: Number.parseInt(length, 10),
          style,
          resolution: quality === "HD" ? "720p" : "360p",
        },
      });

      for (let i = 0; i < 90; i++) {
        await new Promise((r) => setTimeout(r, 6000));
        if (cancelled.current) return;
        const status = await check({ data: { id: job.id } });
        setProgress(Math.max(10, Math.min(95, status.progress || 10)));
        if (status.status === "completed" && status.url) {
          setProgress(100);
          setVideoUrl(status.url);
          return;
        }
        if (status.status === "failed") {
          throw new Error(status.error ?? "The video could not be generated.");
        }
      }
      throw new Error("The video is taking longer than expected. Please try again.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <StudioShell>
      <PageHeading
        title="Text to Video"
        description="Describe a scene and Gen12 generates a short video with sound."
        action={<FreeBadge />}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <div className="glass rounded-3xl p-5">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A golden retriever puppy running through autumn leaves at sunrise, warm light, gentle piano music"
              className="min-h-36 resize-none border-0 bg-transparent text-base focus-visible:ring-0"
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                {prompt.length}/3000 characters
              </span>
              <Button onClick={run} disabled={running || prompt.trim().length < 3}>
                {running ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Generate Video
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="glass overflow-hidden rounded-3xl">
            {videoUrl ? (
              <div className="space-y-4 p-5">
                {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                <video
                  src={videoUrl}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="w-full rounded-2xl bg-black"
                />
                <Button asChild variant="secondary">
                  <a href={videoUrl} download="gen12-video.mp4">
                    <Download className="size-4" /> Download
                  </a>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                {running ? (
                  <>
                    <Loader2 className="mb-4 size-6 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Rendering your video — this usually takes 1–3 minutes.
                    </p>
                    <div className="mt-5 h-1.5 w-full max-w-sm overflow-hidden rounded-full bg-secondary">
                      <div
                        className="bg-brand h-full rounded-full transition-all duration-700"
                        style={{ width: `${Math.max(6, progress)}%` }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <VideoIcon className="mb-4 size-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Your generated video will appear here.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {error ? (
            <p className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-foreground">
              {error}
            </p>
          ) : null}
        </div>

        <aside className="glass h-fit space-y-6 rounded-3xl p-5">
          <OptionGroup label="Aspect ratio" options={RATIOS} value={ratio} onChange={setRatio} />
          <OptionGroup label="Length" options={LENGTHS} value={length} onChange={setLength} />
          <OptionGroup label="Quality" options={QUALITY} value={quality} onChange={setQuality} />
          <OptionGroup label="Style" options={VIDEO_STYLES} value={style} onChange={setStyle} />
        </aside>
      </div>
    </StudioShell>
  );
}
