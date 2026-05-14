import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Check, ArrowLeft } from "lucide-react";
import { PLANS } from "@/lib/mock-data";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Scegli il tuo piano — CIRCLE" }] }),
  component: Subscription,
});

function Subscription() {
  const navigate = useNavigate();
  const [, setOnboarded] = useLocal<boolean>("circle:onboarded", false);
  const [picked, setPicked] = useLocal<string>("circle:plan", "pro");

  const finish = () => {
    setOnboarded(true);
    navigate({ to: "/jobs" });
  };

  return (
    <div className="min-h-screen bg-background px-6 pb-32 pt-12 text-ink">
      <button
        onClick={() => navigate({ to: "/role" })}
        className="mb-8 flex size-10 items-center justify-center rounded-full bg-card shadow-soft"
        aria-label="Indietro"
      >
        <ArrowLeft className="size-4" />
      </button>
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-[30px] font-semibold leading-tight tracking-tight"
      >
        Scegli il tuo piano.
      </motion.h1>
      <p className="mt-2 text-[14px] text-ink/55">Piani beta. Disdici quando vuoi.</p>

      <div className="mt-8 space-y-4">
        {PLANS.map((p, i) => {
          const active = picked === p.id;
          const dark = p.tone === "dark";
          const primary = p.tone === "primary";
          return (
            <motion.button
              key={p.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setPicked(p.id)}
              className={`relative w-full overflow-hidden rounded-3xl p-5 text-left transition ${
                dark
                  ? "bg-ink text-paper"
                  : primary
                    ? "bg-card text-ink shadow-glow"
                    : "bg-card text-ink shadow-soft"
              } ${active && !dark ? "ring-2 ring-primary/40" : ""} ${active && dark ? "ring-2 ring-paper/30" : ""}`}
            >
              {null}
              <div className="relative flex items-start justify-between">
                <div>
                  <p className={`text-[11px] uppercase tracking-[0.18em] ${dark ? "text-paper/60" : "text-ink/50"}`}>
                    {p.badge}
                  </p>
                  <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight">{p.name}</h3>
                </div>
                <div className="text-right">
                  <p className="font-display text-[22px] font-semibold tracking-tight">{p.price}</p>
                  <p className={`text-[11px] ${dark ? "text-paper/60" : "text-ink/50"}`}>{p.suffix}</p>
                </div>
              </div>
              <ul className={`relative mt-4 space-y-1.5 text-[13px] ${dark ? "text-paper/80" : "text-ink/70"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className={`size-3.5 ${dark ? "text-paper" : "text-primary"}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.button>
          );
        })}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-6 pb-8 pt-4">
        <button
          onClick={finish}
          className="w-full cta rounded-2xl bg-primary py-4 text-[15px] text-primary-foreground shadow-float active:scale-[0.99]"
        >
          Entra nel Circle
        </button>
      </div>
    </div>
  );
}
