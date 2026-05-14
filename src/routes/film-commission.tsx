import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { ArrowLeft, Mail, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/circle/AppShell";
import { Chip } from "@/components/circle/Chip";
import { COMMISSIONS, type Commission } from "@/lib/mock-data";

export const Route = createFileRoute("/film-commission")({
  head: () => ({
    meta: [
      { title: "Film Commission — CIRCLE" },
      {
        name: "description",
        content:
          "Tax credit, incentivi e fondi regionali per produzioni cinematografiche e audiovisive in Italia e in Europa.",
      },
      { property: "og:title", content: "Film Commission — CIRCLE" },
      {
        property: "og:description",
        content:
          "Mappa degli incentivi e dei tax credit per girare in Italia e in Europa.",
      },
    ],
  }),
  component: FilmCommissionPage,
});

const COUNTRY_FILTERS = ["Tutti", "Italia", "Europa"] as const;
type CountryFilter = (typeof COUNTRY_FILTERS)[number];

function FilmCommissionPage() {
  const [filter, setFilter] = useState<CountryFilter>("Tutti");

  const list = useMemo(() => {
    if (filter === "Italia") return COMMISSIONS.filter((c) => c.country === "Italia");
    if (filter === "Europa") return COMMISSIONS.filter((c) => c.country !== "Italia");
    return COMMISSIONS;
  }, [filter]);

  return (
    <AppShell>
      <header className="sticky top-0 z-20 bg-background/85 px-5 pb-3 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Link
            to="/marketplace"
            className="inline-flex size-10 items-center justify-center rounded-full bg-card shadow-soft active:scale-95"
            aria-label="Indietro"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
            Incentivi & Tax Credit
          </p>
          <div className="size-10" />
        </div>
      </header>

      <section className="px-5 pt-2">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[28px] font-semibold leading-tight tracking-tight"
        >
          Dove conviene girare il tuo prossimo progetto.
        </motion.h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink/65">
          Tax credit aggiornati, fondi regionali e supporto delle Film Commission
          in Italia e in Europa. Aggiornato Q4 2025.
        </p>

        {/* Hero strip — Italia */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-5 overflow-hidden rounded-3xl bg-ink p-5 text-paper shadow-float"
        >
          <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">
            Tax credit nazionale · Italia
          </p>
          <h2 className="mt-1 font-display text-[24px] font-semibold tracking-tight">
            Fino al 40% del costo eleggibile
          </h2>
          <p className="mt-1 text-[13px] opacity-75">
            Cumulabile con i fondi regionali. Decreto MiC 2024 — €750M annuali.
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <Bench label="Tetto" value="€20M" />
            <Bench label="Minimo" value="€250k" />
            <Bench label="Risposta" value="60g" />
          </div>
        </motion.div>

        {/* Country filter */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {COUNTRY_FILTERS.map((f) => {
            const active = f === filter;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition ${
                  active
                    ? "border-ink bg-ink text-paper"
                    : "border-ink/10 bg-card text-ink/70 shadow-soft"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] uppercase tracking-[0.22em] text-ink/45">
          {list.length} commission · {filter}
        </p>
        <div className="mt-3 space-y-3 pb-10">
          {list.map((c, i) => (
            <CommissionCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function CommissionCard({ c, index }: { c: Commission; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl bg-card shadow-soft"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3 p-3">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-2xl text-paper"
            style={{ background: c.color }}
            aria-hidden
          >
            <Sparkles className="size-5 opacity-90" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold tracking-tight">
              {c.name}
            </p>
            <p className="inline-flex items-center gap-1 truncate text-[12px] text-ink/55">
              <MapPin className="size-3" />
              {c.region} · {c.country}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-ink/45">
              Tax credit
            </p>
            <p className="font-display text-[18px] font-semibold tracking-tight text-primary">
              {c.credit}
            </p>
          </div>
        </div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden border-t border-ink/[0.06]"
      >
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Spec label="Tetto" value={c.ceiling} />
            <Spec label="Minimo qualificato" value={c.minSpend} />
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-ink/45">
              Punti chiave
            </p>
            <ul className="mt-2 space-y-1.5">
              {c.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-[13px] leading-snug text-ink/75"
                >
                  <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {c.country === "Italia" ? (
              <>
                <Chip tone="outline">Tax credit nazionale</Chip>
                <Chip tone="outline">Fondi regionali</Chip>
              </>
            ) : (
              <Chip tone="outline">Coproduzione internazionale</Chip>
            )}
          </div>

          <a
            href={`mailto:${c.contact}`}
            className="flex items-center justify-between gap-2 cta rounded-2xl bg-primary px-4 py-3 text-primary-foreground active:scale-[0.99]"
          >
            <span className="inline-flex items-center gap-2 text-[13px] font-medium">
              <Mail className="size-4" /> Contatta {c.name.split(" ")[0]}
            </span>
            <span className="text-[12px] opacity-70">{c.contact}</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Bench({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper/10 p-2">
      <p className="font-display text-[15px] font-semibold tracking-tight">
        {value}
      </p>
      <p className="text-[10px] uppercase tracking-wider opacity-70">{label}</p>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-paper p-3 shadow-soft">
      <p className="text-[10px] uppercase tracking-wider text-ink/45">{label}</p>
      <p className="mt-0.5 text-[13.5px] font-semibold tracking-tight">{value}</p>
    </div>
  );
}
