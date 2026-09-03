import { Link } from "@tanstack/react-router";
import {
  Compass,
  HelpCircle,
  Image as ImageIcon,
  LayoutGrid,
  Library,
  Mic,
  Settings,
  Sparkles,
  UserSquare2,
  Video,
  Wand2,
  Film,
} from "lucide-react";
import type { ReactNode } from "react";
import { Wordmark } from "./SiteNav";

const nav = [
  { to: "/create", label: "Create", icon: LayoutGrid },
  { to: "/video", label: "Text to Video", icon: Video },
  { to: "/image-video", label: "Image to Video", icon: Film },
  { to: "/image", label: "Text to Image", icon: ImageIcon },
  { to: "/voice", label: "AI Voice", icon: Mic },
  { to: "/avatar", label: "AI Avatar", icon: UserSquare2 },
  { to: "/tools", label: "Video Tools", icon: Wand2 },
  { to: "/creations", label: "My Creations", icon: Library },
  { to: "/explore", label: "Explore", icon: Compass },
] as const;

const bottom = [
  { to: "/settings", label: "Settings", icon: Settings },
  { to: "/help", label: "Help", icon: HelpCircle },
] as const;

const mobileNav = [
  { to: "/create", label: "Create", icon: Sparkles },
  { to: "/video", label: "Video", icon: Video },
  { to: "/image", label: "Image", icon: ImageIcon },
  { to: "/creations", label: "Library", icon: Library },
  { to: "/explore", label: "Explore", icon: Compass },
] as const;

const itemBase =
  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors";

export function StudioShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border/60 bg-sidebar px-4 py-5 lg:flex">
        <Wordmark />
        <nav className="mt-8 flex flex-1 flex-col gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{
                className: "bg-sidebar-accent text-sidebar-accent-foreground",
              }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className={`${itemBase} hover:bg-sidebar-accent hover:text-sidebar-accent-foreground`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col gap-1 border-t border-border/60 pt-3">
          {bottom.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className={`${itemBase} hover:bg-sidebar-accent hover:text-foreground`}
            >
              <Icon className="size-4" />
              {label}
            </Link>
          ))}
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl lg:hidden">
          <Wordmark />
          <Link
            to="/profile"
            className="glass flex size-8 items-center justify-center rounded-full text-xs font-semibold"
          >
            G
          </Link>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 pt-6 pb-28 sm:px-6 lg:pb-14">
          {children}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/90 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-lg items-stretch justify-between px-2 py-2">
          {mobileNav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-1 flex-col items-center gap-1 rounded-xl py-1.5 text-[11px] font-medium"
            >
              <Icon className="size-5" />
              {label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
