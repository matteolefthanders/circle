import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AppShell } from "@/components/circle/AppShell";
import { JOBS } from "@/lib/mock-data";
import { useLocal } from "@/lib/use-local";
import { Chip } from "@/components/circle/Chip";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: [{ title: "Candidature — CIRCLE" }] }),
  component: Applications,
});

const STATUSES = ["In revisione", "In shortlist", "Callback", "Chiusa"] as const;

function Applications() {
  const [applied] = useLocal<string[]>("circle:applied", []);
  const items = JOBS.filter((j) => applied.includes(j.id));

  return (
    <AppShell>
      <header className="px-5 pt-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">Candidature</p>
        <h1 className="mt-1 font-display text-[30px] font-semibold tracking-tight">Le tue candidature</h1>
      </header>

      <div className="mt-8 grid grid-cols-3 gap-3 px-5">
        <Stat label="Inviate" value={items.length || 4} />
        <Stat label="Viste" value={Math.min(items.length + 2, 6)} />
        <Stat label="Risposte" value={2} />
      </div>

      <section className="mt-8 px-5">
        {items.length === 0 ? (
          <div className="rounded-3xl bg-card p-8 text-center shadow-soft">
            <p className="text-[14px] text-ink/60">Nessuna candidatura ancora.</p>
            <Link
              to="/jobs"
              className="mt-4 inline-block cta rounded-full bg-primary px-5 py-2.5 text-[13px] text-primary-foreground"
            >
              Esplora i progetti
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((j, i) => (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft"
              >
                <div className="size-14 shrink-0 rounded-xl" style={{ background: j.cover }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-tight">{j.title}</p>
                  <p className="truncate text-[12px] text-ink/55">{j.company}</p>
                </div>
                <Chip tone={i === 0 ? "primary" : "default"}>{STATUSES[i % STATUSES.length]}</Chip>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <p className="font-display text-[24px] font-semibold tracking-tight">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-ink/45">{label}</p>
    </div>
  );
}
