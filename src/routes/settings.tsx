import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, LogOut } from "lucide-react";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Impostazioni — CIRCLE" }] }),
  component: Settings,
});

const GROUPS: { title: string; rows: { label: string; hint?: string; toggle?: boolean }[] }[] = [
  { title: "Account", rows: [{ label: "Dati personali" }, { label: "Verifica", hint: "Verificato" }, { label: "Account collegati" }] },
  { title: "Abbonamento", rows: [{ label: "Piano attuale", hint: "Circle Pro" }, { label: "Fatturazione" }, { label: "Ripristina acquisti" }] },
  { title: "Notifiche", rows: [{ label: "Push", toggle: true }, { label: "Email digest", toggle: true }, { label: "Nuovi match", toggle: true }] },
  { title: "Privacy", rows: [{ label: "Visibilità profilo", hint: "Pubblico" }, { label: "Account bloccati" }, { label: "Dati e analisi" }] },
  { title: "Aspetto", rows: [{ label: "Modalità scura", toggle: true }] },
  { title: "Supporto", rows: [{ label: "Centro assistenza" }, { label: "Contattaci" }, { label: "Segnala un bug" }] },
];

function Settings() {
  const navigate = useNavigate();
  const reset = () => {
    localStorage.clear();
    navigate({ to: "/" });
  };
  return (
    <div className="min-h-screen bg-background pb-24 text-ink">
      <header className="flex items-center gap-3 px-5 pt-12">
        <Link to="/profile" className="flex size-10 items-center justify-center rounded-full bg-card shadow-soft" aria-label="Indietro">
          <ArrowLeft className="size-4" />
        </Link>
        <h1 className="font-display text-[22px] font-semibold tracking-tight">Impostazioni</h1>
      </header>

      <div className="space-y-8 px-5 pt-8">
        {GROUPS.map((g, gi) => (
          <motion.section
            key={g.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: gi * 0.04 }}
          >
            <p className="mb-2 px-2 text-[11px] uppercase tracking-[0.22em] text-ink/45">{g.title}</p>
            <div className="overflow-hidden rounded-2xl bg-card shadow-soft">
              {g.rows.map((r, i) => (
                <Row key={r.label} row={r} divider={i !== g.rows.length - 1} />
              ))}
            </div>
          </motion.section>
        ))}

        <button
          onClick={reset}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-destructive/20 bg-destructive/5 py-3.5 text-[14px] font-medium text-destructive"
        >
          <LogOut className="size-4" /> Esci e azzera beta
        </button>
        <p className="pt-2 text-center text-[11px] text-ink/40">CIRCLE Beta · v0.1.0</p>
      </div>
    </div>
  );
}

function Row({ row, divider }: { row: { label: string; hint?: string; toggle?: boolean }; divider: boolean }) {
  const [on, setOn] = useLocal<boolean>(`circle:toggle:${row.label}`, row.label === "Push" || row.label === "Nuovi match");
  return (
    <div className={`flex items-center justify-between px-4 py-3.5 ${divider ? "border-b border-ink/[0.06]" : ""}`}>
      <span className="text-[14px]">{row.label}</span>
      {row.toggle ? (
        <button
          onClick={() => setOn(!on)}
          className={`relative h-7 w-12 rounded-full transition ${on ? "bg-primary" : "bg-ink/15"}`}
          aria-label={row.label}
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className="absolute top-0.5 size-6 rounded-full bg-paper shadow"
            style={{ left: on ? "calc(100% - 26px)" : "2px" }}
          />
        </button>
      ) : (
        <div className="flex items-center gap-2 text-[13px] text-ink/55">
          {row.hint && <span>{row.hint}</span>}
          <ChevronRight className="size-4 text-ink/35" />
        </div>
      )}
    </div>
  );
}
