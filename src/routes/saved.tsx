import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { JobCard } from "@/components/circle/JobCard";
import { JOBS } from "@/lib/mock-data";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/saved")({
  head: () => ({ meta: [{ title: "Salvati — CIRCLE" }] }),
  component: Saved,
});

function Saved() {
  const [saved, setSaved] = useLocal<string[]>("circle:saved", []);
  const items = JOBS.filter((j) => saved.includes(j.id));

  return (
    <div className="min-h-screen bg-background pb-16 text-ink">
      <header className="flex items-center gap-3 px-5 pt-12">
        <Link to="/jobs" className="flex size-10 items-center justify-center rounded-full bg-card shadow-soft" aria-label="Indietro">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">Salvati</p>
          <h1 className="font-display text-[22px] font-semibold tracking-tight">La tua shortlist</h1>
        </div>
      </header>

      <div className="space-y-4 px-5 pt-6">
        {items.length === 0 ? (
          <div className="rounded-3xl bg-card p-8 text-center shadow-soft">
            <p className="text-[14px] text-ink/60">Niente salvato ancora.</p>
            <Link to="/jobs" className="mt-3 inline-block text-primary">Esplora i progetti →</Link>
          </div>
        ) : (
          items.map((j, i) => (
            <JobCard
              key={j.id}
              job={j}
              index={i}
              saved
              onToggleSave={() => setSaved((p) => p.filter((x) => x !== j.id))}
            />
          ))
        )}
      </div>
    </div>
  );
}
