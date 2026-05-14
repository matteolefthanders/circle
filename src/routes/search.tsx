import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowLeft, Search as SearchIcon, SlidersHorizontal } from "lucide-react";
import { JOBS } from "@/lib/mock-data";
import { Chip } from "@/components/circle/Chip";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Cerca — CIRCLE" }] }),
  component: SearchPage,
});

const SUGGESTIONS = ["Roma", "Remoto", "Pagato", "Voce", "A24", "Lungometraggio", "Milano", "UGC"];

function SearchPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<{ paid: boolean; remote: boolean }>({ paid: false, remote: false });

  const results = useMemo(() => {
    const norm = q.toLowerCase();
    return JOBS.filter((j) => {
      if (filters.paid && !j.paid) return false;
      if (filters.remote && !j.remote) return false;
      if (!norm) return true;
      return [j.title, j.company, j.location, j.category].some((s) => s.toLowerCase().includes(norm));
    });
  }, [q, filters]);

  return (
    <div className="min-h-screen bg-background pb-16 text-ink">
      <header className="px-5 pt-12">
        <div className="flex items-center gap-3">
          <Link to="/jobs" className="flex size-10 items-center justify-center rounded-full bg-card shadow-soft" aria-label="Indietro">
            <ArrowLeft className="size-4" />
          </Link>
          <div className="flex flex-1 items-center gap-2 rounded-full bg-card px-4 py-2.5 shadow-soft">
            <SearchIcon className="size-4 text-ink/45" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cerca progetti, persone, luoghi"
              className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink/35"
            />
          </div>
          <button onClick={() => setOpen(true)} className="flex size-10 items-center justify-center rounded-full bg-ink text-paper shadow-soft" aria-label="Filtri">
            <SlidersHorizontal className="size-4" />
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button key={s} onClick={() => setQ(s)}>
              <Chip tone="outline">{s}</Chip>
            </button>
          ))}
        </div>
      </header>

      <section className="mt-6 px-5">
        <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-ink/45">
          {results.length} risultat{results.length === 1 ? "o" : "i"}
        </p>
        <div className="space-y-3">
          {results.map((j, i) => (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to="/jobs/$id" params={{ id: j.id }} className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
                <div className="size-14 shrink-0 rounded-xl" style={{ background: j.cover }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-tight">{j.title}</p>
                  <p className="truncate text-[12px] text-ink/55">{j.company} · {j.location}</p>
                </div>
                <span className="text-[11px] font-medium text-primary">{j.category}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-end bg-ink/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full rounded-t-[28px] bg-background p-6"
          >
            <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ink/15" />
            <h2 className="font-display text-[22px] font-semibold tracking-tight">Filtri</h2>

            <FilterRow label="Paese">
              <div className="flex flex-wrap gap-1.5">
                {["Italia", "USA", "UK", "Francia", "Germania", "Worldwide"].map((c) => (
                  <Chip key={c} tone="outline">{c}</Chip>
                ))}
              </div>
            </FilterRow>
            <FilterRow label="Lingua">
              <div className="flex flex-wrap gap-1.5">
                {["Italiano", "Inglese", "Francese", "Spagnolo", "Tedesco"].map((c) => (
                  <Chip key={c} tone="outline">{c}</Chip>
                ))}
              </div>
            </FilterRow>
            <FilterRow label="Età">
              <input type="range" min={18} max={65} defaultValue={35} className="w-full accent-primary" />
            </FilterRow>
            <FilterRow label="Compenso">
              <div className="flex gap-2">
                <Toggle on={filters.paid} onClick={() => setFilters((f) => ({ ...f, paid: !f.paid }))}>Solo pagati</Toggle>
                <Toggle on={filters.remote} onClick={() => setFilters((f) => ({ ...f, remote: !f.remote }))}>Remoto</Toggle>
              </div>
            </FilterRow>
            <FilterRow label="Genere">
              <div className="flex flex-wrap gap-1.5">
                {["Horror", "Drammatico", "Thriller", "Documentario", "Fashion", "Commedia", "Videoclip"].map((c) => (
                  <Chip key={c} tone="outline">{c}</Chip>
                ))}
              </div>
            </FilterRow>

            <button onClick={() => setOpen(false)} className="mt-6 w-full cta rounded-2xl bg-primary py-4 text-[15px] text-primary-foreground shadow-float">
              Mostra {results.length} risultati
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-ink/[0.06] py-4">
      <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-ink/45">{label}</p>
      {children}
    </div>
  );
}

function Toggle({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition ${
        on ? "bg-primary text-primary-foreground" : "border border-ink/15 text-ink/70"
      }`}
    >
      {children}
    </button>
  );
}
