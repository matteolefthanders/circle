import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Plus, Users, Star, MessageSquare } from "lucide-react";
import { JOBS } from "@/lib/mock-data";

export const Route = createFileRoute("/producer")({
  head: () => ({ meta: [{ title: "Modalità produttore — CIRCLE" }] }),
  component: Producer,
});

const STATS = [
  { label: "Progetti attivi", value: 3, icon: Star },
  { label: "Candidature", value: 87, icon: Users },
  { label: "Shortlist", value: 14, icon: Star },
  { label: "Messaggi", value: 6, icon: MessageSquare },
];

function Producer() {
  return (
    <div className="min-h-screen bg-ink pb-16 text-paper">
      <header className="flex items-center justify-between px-5 pt-12">
        <Link to="/jobs" className="glass-dark flex size-10 items-center justify-center rounded-full" aria-label="Indietro">
          <ArrowLeft className="size-4" />
        </Link>
        <p className="text-[11px] uppercase tracking-[0.22em] text-paper/55">Produttore · Beta</p>
        <Link
          to="/studio"
          className="glass-dark flex size-10 items-center justify-center rounded-full text-[11px] font-semibold"
          aria-label="Profilo studio"
        >
          QR
        </Link>
      </header>

      <div className="px-5 pt-8">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-[30px] font-semibold leading-tight tracking-tight"
        >
          Dashboard
        </motion.h1>
        <p className="mt-1 text-[14px] text-paper/55">Bentornato, Quiet Room Studio.</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl border border-paper/10 bg-paper/[0.04] p-4 backdrop-blur"
            >
              <s.icon className="size-4 text-primary" />
              <p className="mt-3 font-display text-[28px] font-semibold tracking-tight">{s.value}</p>
              <p className="text-[11px] uppercase tracking-wider text-paper/55">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="mt-5 flex w-full items-center justify-between rounded-3xl bg-lavender p-5 text-paper shadow-glow"
        >
          <div className="text-left">
            <p className="text-[11px] uppercase tracking-[0.22em] opacity-80">Nuovo progetto</p>
            <p className="mt-1 font-display text-[20px] font-semibold tracking-tight">Pubblica un casting</p>
          </div>
          <Plus className="size-5" />
        </motion.button>

        <section className="mt-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-paper/45">Progetti attivi</p>
          <div className="space-y-3">
            {JOBS.slice(0, 3).map((j) => (
              <div key={j.id} className="flex items-center gap-3 rounded-2xl border border-paper/10 bg-paper/[0.04] p-3">
                <div className="size-14 shrink-0 rounded-xl" style={{ background: j.cover }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-medium tracking-tight">{j.title}</p>
                  <p className="truncate text-[12px] text-paper/55">{j.roles} ruoli · {Math.floor(Math.random() * 30) + 6} candidature</p>
                </div>
                <button className="rounded-full bg-paper/10 px-3 py-1.5 text-[11px] font-medium">Apri</button>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-paper/45">Talent radar</p>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl border border-paper/10 p-2"
                style={{ background: `linear-gradient(${i * 50}deg, oklch(0.4 0.12 ${i * 60}), oklch(0.15 0.05 ${i * 80}))` }}
              >
                <div className="flex h-full flex-col justify-end">
                  <p className="text-[10px] font-medium text-paper">Talent {i + 1}</p>
                  <p className="text-[9px] text-paper/55">Recitazione · Italia</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
