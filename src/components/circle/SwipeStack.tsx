import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "framer-motion";
import { Heart, Info, X, MapPin, Sparkles, Briefcase, Dot } from "lucide-react";
import type { CircleProfile } from "@/lib/mock-data";
import { useState } from "react";

type Props = {
  profiles: CircleProfile[];
  onLike: (p: CircleProfile) => void;
  onSkip: (p: CircleProfile) => void;
  onInfo: (p: CircleProfile) => void;
};

const SWIPE_THRESHOLD = 110;

export function SwipeStack({ profiles, onLike, onSkip, onInfo }: Props) {
  const [index, setIndex] = useState(0);

  const visible = profiles.slice(index, index + 3);
  const top = visible[0];

  const advance = (dir: "left" | "right") => {
    if (!top) return;
    if (dir === "right") onLike(top);
    else onSkip(top);
    setIndex((i) => i + 1);
  };

  if (!top) {
    return (
      <div className="flex h-[440px] items-center justify-center px-8 text-center">
        <div>
          <Sparkles className="mx-auto size-8 text-foreground/35" />
          <p className="mt-3 font-display text-[18px] font-semibold tracking-tight text-foreground">
            Per oggi è tutto.
          </p>
          <p className="mt-1.5 text-[13px] text-foreground/60">
            Cambia filtri o torna domani per nuovi profili.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="relative mx-auto h-[440px] w-full max-w-sm">
        <AnimatePresence initial={false}>
          {visible
            .slice()
            .reverse()
            .map((p, reverseIdx) => {
              const depth = visible.length - 1 - reverseIdx;
              if (depth === 0) {
                return <TopCard key={p.id} profile={p} onResolved={advance} />;
              }
              return (
                <motion.div
                  key={p.id}
                  initial={{ scale: 0.94 - depth * 0.03, y: depth * 14, opacity: 0 }}
                  animate={{ scale: 0.97 - depth * 0.03, y: depth * 14, opacity: 0.6 }}
                  className="absolute inset-0 rounded-[28px] glass-card shadow-soft"
                  style={{ zIndex: 10 - depth }}
                />
              );
            })}
        </AnimatePresence>
      </div>

      <div className="mt-7 flex items-center justify-center gap-6">
        <button
          aria-label="Skip"
          onClick={() => advance("left")}
          className="flex size-14 items-center justify-center rounded-full glass-pill text-foreground/80 shadow-soft transition active:scale-95"
        >
          <X className="size-5" strokeWidth={2.4} />
        </button>
        <button
          aria-label="Dettagli"
          onClick={() => onInfo(top)}
          className="flex size-12 items-center justify-center rounded-full glass-pill text-foreground/75 shadow-soft transition active:scale-95"
        >
          <Info className="size-[18px]" strokeWidth={2.2} />
        </button>
        <button
          aria-label="Like"
          onClick={() => advance("right")}
          className="flex size-16 items-center justify-center rounded-full bg-ember text-white shadow-ember transition active:scale-95"
        >
          <Heart className="size-6 fill-current" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function TopCard({
  profile,
  onResolved,
}: {
  profile: CircleProfile;
  onResolved: (dir: "left" | "right") => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-10, 0, 10]);
  const likeOpacity = useTransform(x, [40, 140], [0, 1]);
  const skipOpacity = useTransform(x, [-140, -40], [1, 0]);

  const handleEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset > SWIPE_THRESHOLD || velocity > 600) onResolved("right");
    else if (offset < -SWIPE_THRESHOLD || velocity < -600) onResolved("left");
  };

  // mock recent works as small list
  const credits = [
    profile.lastWork,
    `${profile.experience} di esperienza`,
  ];

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleEnd}
      style={{ x, rotate, zIndex: 20 }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 cursor-grab overflow-hidden rounded-[28px] glass-card shadow-lift active:cursor-grabbing"
    >
      {/* Soft ember halo behind avatar */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "var(--gradient-ember)" }}
      />

      {/* Drag indicators */}
      <motion.div
        style={{ opacity: likeOpacity }}
        className="pointer-events-none absolute left-5 top-5 rotate-[-10deg] rounded-2xl border-[2px] border-primary px-3 py-1 text-[14px] font-semibold uppercase tracking-wider text-primary"
      >
        Like
      </motion.div>
      <motion.div
        style={{ opacity: skipOpacity }}
        className="pointer-events-none absolute right-5 top-5 rotate-[10deg] rounded-2xl border-[2px] border-foreground/40 px-3 py-1 text-[14px] font-semibold uppercase tracking-wider text-foreground/50"
      >
        Skip
      </motion.div>

      <div className="relative flex h-full flex-col items-center px-7 pb-6 pt-12">
        {/* Avatar */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full opacity-70 blur-xl"
            style={{ background: "var(--gradient-ember)" }}
          />
          <img
            src={profile.photo}
            alt={profile.name}
            draggable={false}
            loading="lazy"
            className="relative size-32 rounded-full object-cover ring-2 ring-foreground/10 shadow-lift"
          />
          <span className="absolute bottom-1 right-1 flex h-6 items-center gap-1 rounded-full bg-emerald-500/95 px-2 text-[10.5px] font-semibold text-white shadow-soft">
            <Dot className="-mx-1.5 size-4" strokeWidth={6} />
            Disponibile
          </span>
        </div>

        {/* Name + role */}
        <div className="mt-6 text-center">
          <h3 className="font-display text-[26px] font-semibold leading-tight tracking-tight text-foreground">
            {profile.name}
            <span className="ml-1.5 text-[18px] font-normal text-foreground/55">
              {profile.age}
            </span>
          </h3>
          <p className="mt-1 text-[14px] font-medium text-foreground/85">
            {profile.roleLabel}
          </p>
          <p className="mt-2 inline-flex items-center gap-1 rounded-full glass-pill px-2.5 py-1 text-[11.5px] text-foreground/80">
            <MapPin className="size-3" />
            {profile.city}
          </p>
        </div>

        {/* Bio */}
        <p className="mt-5 line-clamp-2 text-center text-[13.5px] leading-relaxed text-foreground/75">
          {profile.bio}
        </p>

        {/* Skills */}
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {profile.skills.slice(0, 3).map((s) => (
            <span
              key={s}
              className="rounded-full glass-pill px-2.5 py-1 text-[11px] font-medium text-foreground/85"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Recent credits */}
        <div className="mt-auto w-full rounded-2xl border border-foreground/10 bg-foreground/[0.03] px-4 py-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
            Ultimi lavori
          </p>
          <ul className="mt-1.5 space-y-1">
            {credits.map((c) => (
              <li
                key={c}
                className="flex items-center gap-2 text-[12.5px] text-foreground/85"
              >
                <Briefcase className="size-3 shrink-0 text-foreground/45" />
                <span className="truncate">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
