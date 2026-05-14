import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, MessageCircle, Eye, Bell } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/mock-data";

export const Route = createFileRoute("/notifications")({
  head: () => ({ meta: [{ title: "Notifiche — CIRCLE" }] }),
  component: Notifications,
});

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  match: Sparkles,
  message: MessageCircle,
  view: Eye,
  update: Bell,
  system: Bell,
};

function Notifications() {
  return (
    <div className="min-h-screen bg-background pb-16 text-ink">
      <header className="flex items-center gap-3 px-5 pt-12">
        <Link to="/jobs" className="flex size-10 items-center justify-center rounded-full bg-card shadow-soft" aria-label="Indietro">
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">Attività</p>
          <h1 className="font-display text-[22px] font-semibold tracking-tight">Notifiche</h1>
        </div>
      </header>

      <ul className="mt-6 px-3">
        {NOTIFICATIONS.map((n, i) => {
          const Icon = ICONS[n.kind] ?? Bell;
          return (
            <motion.li
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 rounded-2xl px-2 py-3"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[14px] font-medium tracking-tight">{n.title}</p>
                  <span className="text-[11px] text-ink/45">{n.time}</span>
                </div>
                <p className="text-[13px] leading-snug text-ink/60">{n.body}</p>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
