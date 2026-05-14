import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Mic, Image as ImageIcon, Send, Sparkles } from "lucide-react";
import { CONVERSATIONS, MESSAGES } from "@/lib/mock-data";
import { getMatchedConvos, markMatchRead } from "@/lib/daily-likes";

export const Route = createFileRoute("/messages/$id")({
  head: () => ({ meta: [{ title: "Chat — CIRCLE" }] }),
  component: Thread,
});

type Resolved = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isPhoto: boolean;
  time: string;
  fromMatch: boolean;
};

function Thread() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [resolved, setResolved] = useState<Resolved | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const staticConvo = CONVERSATIONS.find((c) => c.id === id);
    if (staticConvo) {
      setResolved({
        id: staticConvo.id,
        name: staticConvo.name,
        role: staticConvo.role,
        avatar: staticConvo.avatar,
        isPhoto: false,
        time: staticConvo.time,
        fromMatch: false,
      });
      return;
    }
    const matched = getMatchedConvos().find((c) => c.id === id);
    if (matched) {
      markMatchRead(matched.id);
      setResolved({
        id: matched.id,
        name: matched.name,
        role: matched.role,
        avatar: matched.avatar,
        isPhoto: true,
        time: "ora",
        fromMatch: true,
      });
      return;
    }
    setNotFound(true);
  }, [id]);

  const initial = useMemo(() => MESSAGES[id] ?? [], [id]);
  const [list, setList] = useState<{ from: "me" | "them"; text: string; time: string }[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setList(initial);
  }, [initial]);

  if (notFound) {
    return (
      <div className="p-8 text-center">
        <Link to="/messages">← Indietro</Link>
      </div>
    );
  }
  if (!resolved) return null;

  const send = () => {
    if (!draft.trim()) return;
    setList((m) => [...m, { from: "me", text: draft, time: "ora" }]);
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setList((m) => [...m, { from: "them", text: "Ricevuto — a presto ✦", time: "ora" }]);
    }, 1400);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-ink">
      <header className="glass sticky top-0 z-20 flex items-center gap-3 px-5 py-3 pt-12">
        <button onClick={() => navigate({ to: "/messages" })} className="flex size-9 items-center justify-center rounded-full bg-card shadow-soft" aria-label="Indietro">
          <ArrowLeft className="size-4" />
        </button>
        {resolved.isPhoto ? (
          <img src={resolved.avatar} alt={resolved.name} className="size-10 rounded-full object-cover" />
        ) : (
          <div className="size-10 rounded-full" style={{ background: resolved.avatar }} />
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[14px] font-medium tracking-tight">{resolved.name}</p>
          <p className="truncate text-[11px] text-ink/55">{resolved.role}</p>
        </div>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {resolved.fromMatch && list.length === 0 && (
          <div className="mx-auto flex max-w-xs flex-col items-center rounded-3xl bg-card px-5 py-6 text-center shadow-soft">
            <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Sparkles className="size-4" />
            </div>
            <p className="mt-3 font-display text-[15px] font-semibold tracking-tight">
              È un match!
            </p>
            <p className="mt-1 text-[12px] text-ink/55">
              Rompi il ghiaccio: parla del tuo prossimo progetto o di un set in comune.
            </p>
          </div>
        )}
        {list.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[78%] rounded-3xl px-4 py-2.5 text-[14px] leading-snug ${
                m.from === "me"
                  ? "rounded-br-md bg-primary text-primary-foreground"
                  : "rounded-bl-md bg-card text-ink shadow-soft"
              }`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="flex gap-1 rounded-3xl rounded-bl-md bg-card px-4 py-3 shadow-soft">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="size-1.5 rounded-full bg-ink/40"
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
        {list.length > 1 && (
          <p className="pt-1 text-center text-[10px] tracking-wide text-ink/40">Letto · {resolved.time}</p>
        )}
      </div>

      <div className="sticky bottom-0 bg-background/85 px-4 pb-6 pt-2 backdrop-blur-xl">
        <div className="flex items-center gap-2 rounded-full bg-card px-2 py-1.5 shadow-soft">
          <button className="flex size-9 items-center justify-center rounded-full text-ink/55" aria-label="Allega"><ImageIcon className="size-4" /></button>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Messaggio"
            className="flex-1 bg-transparent px-1 py-2 text-[14px] outline-none placeholder:text-ink/40"
          />
          {draft.trim() ? (
            <button onClick={send} className="flex size-9 items-center justify-center rounded-full bg-ink text-paper active:scale-95" aria-label="Invia">
              <Send className="size-4" />
            </button>
          ) : (
            <button className="flex size-9 items-center justify-center rounded-full bg-ink text-paper active:scale-95" aria-label="Vocale">
              <Mic className="size-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
