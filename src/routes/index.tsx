import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Logo } from "@/components/circle/Logo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CIRCLE" },
      {
        name: "description",
        content:
          "CIRCLE is a private creative ecosystem for actors, filmmakers, voice artists, creators and crews.",
      },
      { property: "og:title", content: "CIRCLE" },
      {
        property: "og:description",
        content: "The creative network for film, talent & production.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const onboarded = localStorage.getItem("circle:onboarded") === "true";
      if (onboarded) {
        const t = setTimeout(() => navigate({ to: "/jobs" }), 1100);
        return () => clearTimeout(t);
      }
    }
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-login px-6 text-ink">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center"
      >
        <Logo size={56} withText={false} interactive={false} />
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-6 font-display text-[34px] font-semibold tracking-[0.32em] uppercase"
        >
          Red Circle
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-5 max-w-[280px] text-balance text-center text-[13px] leading-relaxed text-ink/60"
        >
          Il nuovo marketplace degli artisti cinematografici.
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate({ to: "/welcome" })}
        className="absolute bottom-12 inline-flex items-center gap-2 cta rounded-full bg-primary px-7 py-3.5 text-sm text-primary-foreground shadow-float"
      >
        Entra nel Circle
        <span aria-hidden>→</span>
      </motion.button>
    </div>
  );
}
