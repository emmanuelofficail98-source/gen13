import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Download, Image as ImageIcon, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StudioShell } from "@/components/gen12/StudioShell";
import { FreeBadge, OptionGroup, PageHeading } from "@/components/gen12/studio-ui";
import { generateImage } from "@/lib/generate.functions";
import { ASPECT_RATIOS, IMAGE_STYLES } from "@/lib/gen12";

export const Route = createFileRoute("/image")({
  head: () => ({
    meta: [
      { title: "Text to Image — Free AI Image Generator | Gen12" },
      {
        name: "description",
        content:
          "Create high-quality AI images from a text prompt. Free on Gen12, no subscription or credit card.",
      },
      { property: "og:title", content: "Text to Image — Free AI Image Generator | Gen12" },
      {
        property: "og:description",
        content: "Describe anything and Gen12 generates the image for free.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TextToImage,
});

function TextToImage() {
  const create = useServerFn(generateImage);
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState<string>("1:1");
  const [style, setStyle] = useState<string>("Cinematic");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const run = async () => {
    if (prompt.trim().length < 3 || running) return;
    setRunning(true);
    setError(null);
    setImageUrl(null);
    try {
      const result = await create({
        data: {
          prompt: prompt.trim(),
          aspectRatio: ratio as "16:9" | "9:16" | "1:1",
          style,
        },
      });
      setImageUrl(result.url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setRunning(false);
    }
  };

  return (
    <StudioShell>
      <PageHeading
        title="Text to Image"
        description="Describe an image and Gen12 creates it in seconds."
        action={<FreeBadge />}
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <div className="glass rounded-3xl p-5">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A neon-lit street market in the rain, reflections on wet asphalt, shallow depth of field"
              className="min-h-36 resize-none border-0 bg-transparent text-base focus-visible:ring-0"
            />
            <div className="mt-4 flex items-center justify-between gap-3">
              <span className="text-xs text-muted-foreground">
                {prompt.length}/4000 characters
              </span>
              <Button onClick={run} disabled={running || prompt.trim().length < 3}>
                {running ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Generating…
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" /> Generate Image
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="glass overflow-hidden rounded-3xl">
            {imageUrl ? (
              <div className="space-y-4 p-5">
                <img
                  src={imageUrl}
                  alt={prompt}
                  className="w-full rounded-2xl bg-black object-contain"
                />
                <Button asChild variant="secondary">
                  <a href={imageUrl} download="gen12-image.png">
                    <Download className="size-4" /> Download
                  </a>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
                {running ? (
                  <>
                    <Loader2 className="mb-4 size-6 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Painting your image…</p>
                  </>
                ) : (
                  <>
                    <ImageIcon className="mb-4 size-6 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">
                      Your generated image will appear here.
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
          <OptionGroup
            label="Aspect ratio"
            options={ASPECT_RATIOS}
            value={ratio}
            onChange={setRatio}
          />
          <OptionGroup label="Style" options={IMAGE_STYLES} value={style} onChange={setStyle} />
        </aside>
      </div>
    </StudioShell>
  );
}
