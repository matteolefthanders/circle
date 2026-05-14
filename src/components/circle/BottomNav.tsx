import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Compass, Store, MessageCircle } from "lucide-react";
import penguinAvatar from "@/assets/red-penguin-avatar.jpg";

function CircleMark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      className="relative z-10"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={2} />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  );
}

const tabs = [
  { to: "/jobs", icon: Compass, label: "Scopri" },
  { to: "/marketplace", icon: Store, label: "Mercato" },
  { to: "/community", icon: "circle" as const, label: "Circle" },
  { to: "/messages", icon: MessageCircle, label: "Chat" },
  { to: "/profile", icon: "avatar" as const, label: "Profilo" },
] as const;

export function BottomNav() {
  const { pathname } = useLocation();
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center pb-[max(env(safe-area-inset-bottom),14px)]">
      <motion.nav
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="pointer-events-auto mx-4 flex w-full max-w-md items-center justify-between rounded-full border border-foreground/15 bg-background/85 px-4 py-2 ring-1 ring-foreground/[0.04] backdrop-blur-2xl backdrop-saturate-150"
        style={{
          boxShadow:
            "0 -1px 0 rgba(255,255,255,0.5) inset, 0 24px 48px -12px oklch(0.16 0.012 30 / 0.28), 0 8px 24px -8px oklch(0.16 0.012 30 / 0.18)",
        }}
      >
        {tabs.map((t) => {
          const isCircle = t.icon === "circle";
          const active =
            pathname === t.to || (t.to !== "/jobs" && pathname.startsWith(t.to));

          if (isCircle) {
            return (
              <div
                key={t.to}
                aria-label={t.label}
                aria-disabled="true"
                className="relative flex items-center justify-center -my-2 cursor-not-allowed opacity-90"
              >
                <span
                  className="relative flex h-12 w-12 items-center justify-center rounded-full text-white shadow-ember"
                  style={{ background: "var(--gradient-ember)" }}
                >
                  <CircleMark />
                </span>
              </div>
            );
          }

          const isAvatar = t.icon === "avatar";
          const Icon = !isAvatar ? (t.icon as typeof Compass) : null;

          return (
            <Link
              key={t.to}
              to={t.to}
              aria-label={t.label}
              className="relative flex flex-1 flex-col items-center justify-center gap-1 px-2 py-2"
            >
              <span
                className={`relative z-10 flex items-center justify-center transition-colors ${
                  active ? "text-foreground" : "text-foreground/45"
                }`}
              >
                {isAvatar ? (
                  <span
                    className={`flex size-[26px] items-center justify-center rounded-full p-[1.5px] transition ${
                      active ? "" : "opacity-80"
                    }`}
                    style={
                      active
                        ? { background: "var(--gradient-ember)" }
                        : { background: "color-mix(in oklab, var(--foreground) 18%, transparent)" }
                    }
                  >
                    <img
                      src={penguinAvatar}
                      alt="Profilo"
                      className="size-full rounded-full bg-background object-cover"
                    />
                  </span>
                ) : Icon ? (
                  <Icon className="size-[22px]" strokeWidth={active ? 2.2 : 1.8} />
                ) : null}
              </span>
              <span
                className={`block h-1 w-1 rounded-full transition-all ${
                  active ? "scale-110" : "scale-0"
                }`}
                style={active ? { background: "var(--gradient-ember)", boxShadow: "0 0 10px oklch(0.74 0.21 32 / 0.8)" } : undefined}
              />
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
