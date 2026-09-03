import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Lightbulb,
  MonitorPlay,
  PenLine,
  Play,
  Share2,
  Smartphone,
  Sparkles,
  Users,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteNav } from "@/components/gen12/SiteNav";
import { SiteFooter } from "@/components/gen12/SiteFooter";
import { MORE_TOOLS, PRIMARY_TOOLS, PrimaryToolCard, ToolCard } from "@/components/gen12/tools";
import { demoAssets, demoGallery } from "@/lib/demo-content";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gen12 — Create Anything. For Free." },
      {
        name: "description",
        content:
          "Generate stunning AI videos and images from simple ideas with Gen12. No subscriptions. No paywalls. Just create.",
      },
      { property: "og:title", content: "Gen12 — Create Anything. For Free." },
      {
        property: "og:description",
        content: "Free AI video and image generation. No subscriptions, no paywalls.",
      },
    ],
  }),
  component: Home,
});

const audiences = [
  { label: "Content creators", icon: Sparkles },
  { label: "YouTubers", icon: Youtube },
  { label: "TikTok creators", icon: Smartphone },
  { label: "Businesses", icon: Briefcase },
  { label: "Students", icon: GraduationCap },
  { label: "Designers", icon: PenLine },
  { label: "Social media managers", icon: Users },
  { label: "Beginners", icon: Lightbulb },
];

const steps = [
  { label: "Idea", detail: "Start with a thought." },
  { label: "Prompt", detail: "Describe it in plain words." },
  { label: "AI Generation", detail: "Gen12 builds the scene." },
  { label: "Finished Video", detail: "Download and share." },
];

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <img
            src={heroImage}
            alt="AI generated collage of cinematic scenes, characters and digital artwork"
            width={1536}
            height={1024}
            className="animate-drift h-full w-full scale-110 object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-background/60" />
          <div className="halo absolute inset-x-0 top-0 h-[520px] opacity-70" />
          <div className="bg-brand animate-float absolute -left-24 top-32 size-72 rounded-full opacity-20 blur-3xl" />
          <div className="bg-brand animate-float absolute -right-16 top-10 size-64 rounded-full opacity-20 blur-3xl [animation-delay:2s]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
        </div>

        <div className="relative mx-auto w-full max-w-5xl px-4 py-24 text-center sm:px-6 sm:py-32">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium">
            <span className="bg-brand size-1.5 rounded-full" />
            100% Free AI Creation
          </span>
          <h1 className="mt-7 text-4xl leading-[1.05] font-semibold sm:text-6xl lg:text-7xl">
            Create Anything.{" "}
            <span className="text-gradient block sm:inline">For Free.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Generate stunning AI videos and images from simple ideas. No subscriptions. No
            paywalls. Just create.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl" className="w-full sm:w-auto">
              <Link to="/create">
                Start Creating <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
              <Link to="/explore">Explore Creations</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Studio */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">What do you want to create?</h2>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Pick a starting point. Every tool on Gen12 is free to use.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {PRIMARY_TOOLS.map((t) => (
            <PrimaryToolCard key={t.title} tool={t} />
          ))}
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MORE_TOOLS.map((t) => (
            <ToolCard key={t.title} tool={t} />
          ))}
        </div>
      </section>

      {/* Section 1 */}
      <section className="border-y border-border/60 bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            One Platform. Endless Possibilities.
          </h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Video, image, voice and avatars — all in a single studio built for speed.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[...PRIMARY_TOOLS, ...MORE_TOOLS].slice(0, 8).map((t) => (
              <ToolCard key={`p-${t.title}`} tool={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">From Words to Videos</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s.label} className="glass relative rounded-2xl p-6">
              <span className="text-gradient font-display text-3xl font-semibold">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-semibold">{s.label}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{s.detail}</p>
              {i < steps.length - 1 ? (
                <ArrowRight className="absolute top-1/2 -right-3 hidden size-5 text-muted-foreground md:block" />
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6">
        <div className="glass overflow-hidden rounded-3xl">
          <div className="grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Bring Your Images to Life
              </h2>
              <p className="mt-3 text-muted-foreground">
                Upload a still, describe the motion, and Gen12 turns it into a moving
                scene.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                {["Image", "Motion", "Video"].map((s, i) => (
                  <span key={s} className="flex items-center gap-3">
                    <span className="rounded-full border border-border bg-secondary/50 px-3.5 py-1.5">
                      {s}
                    </span>
                    {i < 2 ? <ArrowRight className="size-4 text-muted-foreground" /> : null}
                  </span>
                ))}
              </div>
              <Button asChild variant="hero" className="mt-8">
                <Link to="/image-video">Animate an image</Link>
              </Button>
            </div>
            <div className="relative overflow-hidden rounded-2xl border border-border">
              <img
                src={demoAssets.savanna}
                alt="Cinematic savanna scene generated with Gen12"
                loading="lazy"
                width={1024}
                height={576}
                className="w-full object-cover"
              />
              <span className="glass absolute bottom-3 left-3 flex items-center gap-2 rounded-full px-3 py-1.5 text-xs">
                <Play className="size-3" /> Motion preview
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section className="border-y border-border/60 bg-surface/30">
        <div className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-3xl font-semibold sm:text-4xl">Made for Everyone</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Whether it is your first prompt or your thousandth, Gen12 stays free.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className="glass flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-medium transition-colors hover:border-primary/40"
              >
                <Icon className="size-4 text-accent" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold sm:text-4xl">Create. Experiment. Share.</h2>
          <Button asChild variant="ghost">
            <Link to="/explore">
              See everything <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {demoGallery.map((item) => (
            <figure
              key={item.id}
              className="group relative break-inside-avoid overflow-hidden rounded-2xl border border-border"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-background to-transparent p-4 text-xs">
                <span className="font-medium">{item.title}</span>
                <Share2 className="size-3.5 text-muted-foreground" />
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden border-t border-border/60">
        <div className="halo pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
          <MonitorPlay className="mx-auto size-8 text-accent" />
          <h2 className="mt-6 text-3xl font-semibold sm:text-5xl">
            Your next idea starts here.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Create amazing AI images and videos with Gen12.
          </p>
          <Button asChild variant="hero" size="xl" className="mt-8">
            <Link to="/create">Start Creating — Free</Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
