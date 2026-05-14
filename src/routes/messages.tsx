import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { AppShell } from "@/components/circle/AppShell";
import { CONVERSATIONS } from "@/lib/mock-data";
import {
  getMatchedConvos,
  getReadMatches,
  type MatchedConvo,
} from "@/lib/daily-likes";

export const Route = createFileRoute("/messages")({
  head: () => ({ meta: [{ title: "Messaggi — CIRCLE" }] }),
  component: Messages,
});

function Messages() {
  const [matches, setMatches] = useState<MatchedConvo[]>([]);
  const [readIds, setReadIds] = useState<string[]>([]);

  useEffect(() => {
    setMatches(getMatchedConvos());
    setReadIds(getReadMatches());
  }, []);

  return (
    <AppShell>
      <header className="px-5 pt-12">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">Posta in arrivo</p>
        <h1 className="mt-1 font-display text-[30px] font-semibold tracking-tight">Messaggi</h1>
        <div className="mt-5 flex items-center gap-2 rounded-2xl bg-card px-4 py-3 shadow-soft">
          <Search className="size-4 text-ink/45" />
          <input placeholder="Cerca conversazioni" className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-ink/35" />
        </div>
      </header>

      <section className="mt-6 px-3">
        {matches.map((c, i) => {
          const isNew = !readIds.includes(c.id);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                to="/messages/$id"
                params={{ id: c.id }}
                className="flex items-center gap-3 rounded-2xl px-2 py-3 transition active:bg-ink/[0.04]"
              >
                <div className="relative shrink-0">
                  <img
                    src={c.avatar}
                    alt={c.name}
                    className="size-12 rounded-full object-cover"
                  />
                  {isNew && (
                    <span className="absolute -right-0.5 -top-0.5 flex size-5 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
                      <Sparkles className="size-2.5" />
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[14px] font-medium tracking-tight">{c.name}</p>
                    <span className="text-[11px] text-ink/45">ora</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-[13px] text-ink/55">
                      {isNew ? `Nuovo match · ${c.role}` : c.role}
                    </p>
                    {isNew && (
                      <span className="ml-2 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Match
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}

        {CONVERSATIONS.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: (matches.length + i) * 0.04 }}
          >
            <Link
              to="/messages/$id"
              params={{ id: c.id }}
              className="flex items-center gap-3 rounded-2xl px-2 py-3 transition active:bg-ink/[0.04]"
            >
              <div className="size-12 shrink-0 rounded-full" style={{ background: c.avatar }} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-[14px] font-medium tracking-tight">{c.name}</p>
                  <span className="text-[11px] text-ink/45">{c.time}</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-[13px] text-ink/55">{c.last}</p>
                  {c.unread > 0 && (
                    <span className="ml-2 inline-flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
                      {c.unread}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </section>
    </AppShell>
  );
}
