import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useLocal } from "@/lib/use-local";
import { ROLES_TALENT, ROLES_PRODUCTION, type Realm } from "@/lib/mock-data";
import { ArrowLeft, Clapperboard, Camera } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/role")({
  head: () => ({ meta: [{ title: "Scegli il tuo percorso — CIRCLE" }] }),
  component: RolePage,
});

function RolePage() {
  const navigate = useNavigate();
  const [realm, setRealm] = useLocal<Realm | null>("circle:realm", null);
  const [selected, setSelected] = useLocal<string[]>("circle:roles", []);
  const [step, setStep] = useState<0 | 1>(realm ? 1 : 0);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const list = realm === "production" ? ROLES_PRODUCTION : ROLES_TALENT;

  return (
    <div className="min-h-screen bg-login px-6 pb-32 pt-12 text-ink">
      <button
        onClick={() => (step === 1 ? setStep(0) : navigate({ to: "/welcome" }))}
        className="mb-8 flex size-10 items-center justify-center rounded-full bg-card shadow-soft"
        aria-label="Indietro"
      >
        <ArrowLeft className="size-4" />
      </button>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="path"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
              Step 1 di 2
            </p>
            <h1 className="mt-1 font-display text-[30px] font-semibold leading-tight tracking-tight">
              Cosa ti porta in CIRCLE?
            </h1>
            <p className="mt-2 text-[14px] text-ink/55">
              Scegli un percorso. Puoi cambiarlo in qualsiasi momento.
            </p>

            <div className="mt-8 space-y-3">
              <PathCard
                icon={<Camera className="size-7" />}
                title="Talent"
                desc="Attori, voce, creator, modelli, comparse."
                onClick={() => {
                  setRealm("casting");
                  setStep(1);
                }}
              />
              <PathCard
                icon={<Clapperboard className="size-7" />}
                title="Produzione"
                desc="Produttori, troupe, fornitori, location, commissioni."
                onClick={() => {
                  setRealm("production");
                  setStep(1);
                }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="roles"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
              Step 2 di 2 · {realm === "production" ? "Produzione" : "Talent"}
            </p>
            <h1 className="mt-1 font-display text-[30px] font-semibold leading-tight tracking-tight">
              Scegli il tuo ruolo.
            </h1>
            <p className="mt-2 text-[14px] text-ink/55">
              Anche più di uno. Personalizzeremo il tuo feed.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {list.map((r, i) => {
                const active = selected.includes(r.id);
                return (
                  <motion.button
                    key={r.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => toggle(r.id)}
                    className={`relative flex aspect-[1.05] flex-col items-start justify-between rounded-3xl border p-4 text-left transition ${
                      active
                        ? "border-primary/40 bg-primary/[0.06] shadow-glow"
                        : "border-ink/[0.08] bg-card shadow-soft"
                    }`}
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <span className="text-[15px] font-medium tracking-tight">{r.name}</span>
                    {active && (
                      <motion.span
                        layoutId={`role-dot-${r.id}`}
                        className="absolute right-3 top-3 size-2 rounded-full bg-primary"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-6 pb-8 pt-4"
        >
          <button
            disabled={selected.length === 0}
            onClick={() => navigate({ to: "/subscription" })}
            className="w-full cta rounded-2xl bg-primary py-4 text-[15px] text-primary-foreground shadow-float transition active:scale-[0.99] disabled:opacity-40"
          >
            Continua
          </button>
        </motion.div>
      )}
    </div>
  );
}

function PathCard({
  icon,
  title,
  desc,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group flex w-full items-center gap-4 rounded-3xl border border-ink/[0.08] bg-card p-5 text-left shadow-soft transition hover:shadow-float"
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-ink/[0.05] text-ink/80">
        {icon}
      </span>
      <span className="flex-1">
        <span className="block font-display text-[18px] font-semibold tracking-tight">
          {title}
        </span>
        <span className="block text-[12.5px] text-ink/55">{desc}</span>
      </span>
      <span className="text-ink/40">→</span>
    </motion.button>
  );
}
