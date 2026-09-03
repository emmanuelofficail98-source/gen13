import { Link } from "@tanstack/react-router";
import { Instagram, Music2, Twitter, Youtube } from "lucide-react";
import { Wordmark } from "./SiteNav";

const nav = [
  { to: "/", label: "Home" },
  { to: "/video", label: "AI Video" },
  { to: "/image", label: "AI Image" },
  { to: "/tools", label: "Tools" },
  { to: "/explore", label: "Explore" },
] as const;

const more = [
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms of Service" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4">
          <Wordmark />
          <p className="max-w-xs text-sm text-muted-foreground">
            Create Anything. For Free.
          </p>
          <div className="flex gap-2">
            {[Youtube, Twitter, Instagram, Music2].map((Icon, i) => (
              <span
                key={i}
                className="glass flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Create</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Gen12</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {more.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gen12 · Free AI creative studio
      </div>
    </footer>
  );
}
