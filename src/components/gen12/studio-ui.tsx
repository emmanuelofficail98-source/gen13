import { AlertCircle, Check, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { GenerationStage } from "@/lib/gen12";

export function FreeBadge({ className = "" }: { className?: string }) {
  return (
    <Badge
      variant="outline"
      className={`border-primary/40 bg-primary/10 text-[10px] font-semibold tracking-widest text-foreground uppercase ${className}`}
    >
      Free
    </Badge>
  );
}

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export function OptionGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o === value;
          return (
            <button
              key={o}
              type="button"
              onClick={() => onChange(o)}
              className={`rounded-full border px-3.5 py-2 text-sm transition-all ${
                active
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type RunState = "idle" | "running" | "done" | "error";

export function useGenerationRun(stages: GenerationStage[]) {
  const [state, setState] = useState<RunState>("idle");
  const [step, setStep] = useState(-1);
  const [error, setError] = useState<string | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const start = (onDone?: () => void) => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setError(null);
    setState("running");
    setStep(0);
    let elapsed = 0;
    stages.forEach((s, i) => {
      elapsed += s.ms;
      timers.current.push(
        setTimeout(() => {
          if (i === stages.length - 1) {
            setState("done");
            setStep(stages.length);
            onDone?.();
          } else {
            setStep(i + 1);
          }
        }, elapsed),
      );
    });
  };

  const reset = () => {
    timers.current.forEach(clearTimeout);
    setState("idle");
    setStep(-1);
  };

  return { state, step, error, setError, start, reset };
}

export function GenerationProgress({
  stages,
  step,
}: {
  stages: GenerationStage[];
  step: number;
}) {
  const pct = Math.min(100, Math.round((step / stages.length) * 100));
  return (
    <div className="glass rounded-2xl p-5">
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="bg-brand h-full rounded-full transition-all duration-700"
          style={{ width: `${Math.max(6, pct)}%` }}
        />
      </div>
      <ul className="space-y-3">
        {stages.map((s, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li
              key={s.label}
              className={`flex items-center gap-3 text-sm ${
                done || active ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {done ? (
                <Check className="size-4 text-accent" />
              ) : active ? (
                <Loader2 className="size-4 animate-spin text-primary" />
              ) : (
                <span className="size-4 rounded-full border border-border" />
              )}
              {s.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function DemoNotice() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-accent/30 bg-accent/10 p-4 text-sm">
      <AlertCircle className="mt-0.5 size-4 shrink-0 text-accent" />
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">Demo preview.</span> No AI model is
        connected to Gen12 yet, so this is sample content — not a real generation. The
        interface is ready for a provider to be plugged in.
      </p>
    </div>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass flex flex-col items-center rounded-3xl px-6 py-16 text-center">
      <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-secondary">
        <Icon className="size-5 text-muted-foreground" />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
