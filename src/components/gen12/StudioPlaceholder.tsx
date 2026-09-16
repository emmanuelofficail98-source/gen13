import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudioShell } from "./StudioShell";
import { FreeBadge, PageHeading } from "./studio-ui";

export function StudioPlaceholder({
  title,
  description,
  body,
}: {
  title: string;
  description: string;
  body?: string;
}) {
  return (
    <StudioShell>
      <PageHeading title={title} description={description} action={<FreeBadge />} />
      <div className="glass flex flex-col items-center rounded-3xl px-6 py-20 text-center">
        <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-secondary">
          <Sparkles className="size-5 text-muted-foreground" />
        </span>
        <h2 className="text-lg font-semibold">Coming soon — free, like everything on Gen12</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {body ?? "This tool is being built. Meanwhile, try video and image generation."}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/video">Generate a video</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/image">Generate an image</Link>
          </Button>
        </div>
      </div>
    </StudioShell>
  );
}
