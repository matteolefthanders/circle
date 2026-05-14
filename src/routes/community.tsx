import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/circle/AppShell";
import { SwipeStack } from "@/components/circle/SwipeStack";
import { MatchModal } from "@/components/circle/MatchModal";
import { ProfileDetailSheet } from "@/components/circle/ProfileDetailSheet";
import {
  CIRCLE_PROFILES,
  GEO_QUICK,
  ROLES,
  type CircleProfile,
} from "@/lib/mock-data";
import {
  DAILY_LIMIT,
  addMatchToday,
  addMatchedConvo,
  formatCountdown,
  getDailyState,
  getMatchedConvos,
  incrementLike,
  msUntilMidnight,
  type DailyState,
  type MatchedConvo,
} from "@/lib/daily-likes";
import penguinAvatar from "@/assets/red-penguin-avatar.jpg";

export const Route = createFileRoute("/community")({
  head: () => ({ meta: [{ title: "Circle — Trova chi vuoi sul tuo set" }] }),
  component: Circle,
});

type Filter = { city: string | null; role: string | null };

function Circle() {
  const [filter, setFilter] = useState<Filter>({ city: null, role: null });
  const [picker, setPicker] = useState<"city" | "role" | null>(null);
  const [daily, setDaily] = useState<DailyState>({
    date: "",
    count: 0,
    matches: [],
  });
  const [match, setMatch] = useState<{ profile: CircleProfile; convoId: string } | null>(null);
  const [detail, setDetail] = useState<CircleProfile | null>(null);
  const [convos, setConvos] = useState<MatchedConvo[]>([]);
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    setDaily(getDailyState());
    setConvos(getMatchedConvos());
  }, []);

  const limitReached = daily.count >= DAILY_LIMIT;

  useEffect(() => {
    if (!limitReached) return;
    const tick = () => setCountdown(formatCountdown(msUntilMidnight()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [limitReached]);

  const filtered = useMemo(() => {
    return CIRCLE_PROFILES.filter((p) => {
      if (!p.available) return false;
      if (filter.city && p.city !== filter.city) return false;
      if (filter.role && p.roleId !== filter.role) return false;
      return true;
    });
  }, [filter]);

  const todaysMatches = convos.filter((c) => daily.matches.includes(c.profileId));

  const handleLike = (p: CircleProfile) => {
    if (limitReached) return;
    const next = incrementLike();
    setDaily(next);
    if (p.wouldMatch) {
      const convo: MatchedConvo = {
        id: `m-${p.id}`,
        profileId: p.id,
        name: p.name,
        role: p.roleLabel,
        avatar: p.photo,
        city: p.city,
        createdAt: Date.now(),
      };
      const list = addMatchedConvo(convo);
      setConvos(list);
      setDaily(addMatchToday(p.id));
      setMatch({ profile: p, convoId: convo.id });
    }
  };

  const handleSkip = (_: CircleProfile) => {
    // Skip is free
  };

  const cityLabel = filter.city ?? "Ovunque";
  const roleLabel =
    ROLES.find((r) => r.id === filter.role)?.name ?? "Tutti i ruoli";

  return (
    <AppShell>
      <header className="px-5 pt-12">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">Circle</p>
            <h1 className="mt-1 font-display text-[30px] font-semibold tracking-tight">
              Match con il tuo prossimo set
            </h1>
          </div>
          <div className="rounded-full bg-card px-3 py-1.5 text-[11px] font-medium text-ink/70 shadow-soft">
            {Math.min(daily.count, DAILY_LIMIT)}/{DAILY_LIMIT} oggi
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <FilterChip
            label={cityLabel}
            active={!!filter.city}
            onClick={() => setPicker("city")}
          />
          <FilterChip
            label={roleLabel}
            active={!!filter.role}
            onClick={() => setPicker("role")}
          />
        </div>
      </header>

      <main className="mt-6 px-5 pb-8">
        {limitReached ? (
          <LimitReached
            countdown={countdown}
            convos={todaysMatches}
          />
        ) : filtered.length === 0 ? (
          <div className="flex h-[420px] flex-col items-center justify-center text-center">
            <Sparkles className="size-7 text-ink/35" />
            <p className="mt-3 font-display text-[17px] font-semibold tracking-tight">
              Nessun profilo per questi filtri
            </p>
            <p className="mt-1 text-[13px] text-ink/55">
              Prova a togliere città o ruolo.
            </p>
            <button
              onClick={() => setFilter({ city: null, role: null })}
              className="mt-4 rounded-full bg-ink px-4 py-2 text-[12px] font-medium text-paper"
            >
              Reset filtri
            </button>
          </div>
        ) : (
          <SwipeStack
            key={`${filter.city}-${filter.role}`}
            profiles={filtered}
            onLike={handleLike}
            onSkip={handleSkip}
            onInfo={(p) => setDetail(p)}
          />
        )}
      </main>

      <PickerSheet
        open={picker !== null}
        kind={picker}
        current={picker === "city" ? filter.city : filter.role}
        onClose={() => setPicker(null)}
        onSelect={(value) => {
          if (picker === "city") setFilter((f) => ({ ...f, city: value }));
          else if (picker === "role") setFilter((f) => ({ ...f, role: value }));
          setPicker(null);
        }}
      />

      <MatchModal
        profile={match?.profile ?? null}
        convoId={match?.convoId ?? null}
        meAvatar={penguinAvatar}
        onClose={() => setMatch(null)}
      />

      <ProfileDetailSheet
        profile={detail}
        onClose={() => setDetail(null)}
      />
    </AppShell>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-[12px] transition ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-ink/15 bg-card text-ink/75 active:bg-ink/5"
      }`}
    >
      {label}
      <ChevronDown className="size-3.5" />
    </button>
  );
}

function PickerSheet({
  open,
  kind,
  current,
  onClose,
  onSelect,
}: {
  open: boolean;
  kind: "city" | "role" | null;
  current: string | null;
  onClose: () => void;
  onSelect: (value: string | null) => void;
}) {
  const items = useMemo(() => {
    if (kind === "city") {
      return [
        { id: null as string | null, label: "Ovunque" },
        ...GEO_QUICK.map((c) => ({ id: c as string | null, label: c })),
      ];
    }
    if (kind === "role") {
      return [
        { id: null as string | null, label: "Tutti i ruoli" },
        ...ROLES.map((r) => ({ id: r.id as string | null, label: `${r.icon} ${r.name}` })),
      ];
    }
    return [];
  }, [kind]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-card pb-[max(env(safe-area-inset-bottom),16px)]"
          >
            <div className="flex justify-center pt-3">
              <span className="h-1 w-10 rounded-full bg-ink/15" />
            </div>
            <p className="mt-2 px-5 text-center text-[11px] uppercase tracking-[0.22em] text-ink/45">
              {kind === "city" ? "Città" : "Ruolo"}
            </p>
            <div className="mt-3 max-h-[60vh] overflow-y-auto px-3 pb-4">
              {items.map((it) => {
                const active = current === it.id;
                return (
                  <button
                    key={String(it.id)}
                    onClick={() => onSelect(it.id)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[14px] transition ${
                      active
                        ? "bg-ink text-paper"
                        : "text-ink/85 active:bg-ink/5"
                    }`}
                  >
                    <span>{it.label}</span>
                    {active && <span className="text-[11px]">●</span>}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LimitReached({
  countdown,
  convos,
}: {
  countdown: string;
  convos: MatchedConvo[];
}) {
  return (
    <div className="rounded-3xl bg-card p-6 text-center shadow-soft">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Clock className="size-6" />
      </div>
      <p className="mt-4 font-display text-[20px] font-semibold tracking-tight">
        Per oggi hai finito i like
      </p>
      <p className="mt-1 text-[13px] text-ink/55">
        Torna domani per altri 5 profili. Reset tra
      </p>
      <p className="mt-1 font-display text-[28px] font-semibold tabular-nums tracking-tight text-primary">
        {countdown || "—"}
      </p>

      {convos.length > 0 && (
        <div className="mt-6 text-left">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
            I tuoi match di oggi
          </p>
          <div className="mt-2 space-y-2">
            {convos.map((c) => (
              <Link
                key={c.id}
                to="/messages/$id"
                params={{ id: c.id }}
                className="flex items-center gap-3 rounded-2xl bg-paper/60 px-3 py-2.5 transition active:scale-[0.99]"
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="size-10 shrink-0 rounded-full object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium tracking-tight">
                    {c.name}
                  </p>
                  <p className="truncate text-[11.5px] text-ink/55">{c.role}</p>
                </div>
                <MessageCircle className="size-4 text-primary" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
