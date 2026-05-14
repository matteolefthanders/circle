import { AnimatePresence, motion, type Transition } from "framer-motion";
import { useLocation } from "@tanstack/react-router";
import { BottomNav } from "./BottomNav";

type Variant = {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  exit: Record<string, number | string>;
  transition: Transition;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Section-specific motion language, same vocabulary (opacity + subtle blur)
// but different geometry to signal hierarchy.
const variants: Record<string, Variant> = {
  // Feeds / index pages — soft rise
  feed: {
    initial: { opacity: 0, y: 18, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: -10, filter: "blur(6px)" },
    transition: { duration: 0.46, ease },
  },
  // Detail pages — zoom-in continuity from a card
  detail: {
    initial: { opacity: 0, scale: 0.96, filter: "blur(10px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 1.02, filter: "blur(8px)" },
    transition: { duration: 0.5, ease },
  },
  // Profile / you — gentle vertical drift
  profile: {
    initial: { opacity: 0, y: 28, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: { opacity: 0, y: 18, filter: "blur(4px)" },
    transition: { duration: 0.5, ease },
  },
  // Chat / messages — slide-in from right
  chat: {
    initial: { opacity: 0, x: 36, filter: "blur(6px)" },
    animate: { opacity: 1, x: 0, filter: "blur(0px)" },
    exit: { opacity: 0, x: -24, filter: "blur(6px)" },
    transition: { duration: 0.44, ease },
  },
  // Onboarding / cinematic — fade + lift
  cinematic: {
    initial: { opacity: 0, scale: 1.03, filter: "blur(14px)" },
    animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
    exit: { opacity: 0, scale: 0.98, filter: "blur(10px)" },
    transition: { duration: 0.6, ease },
  },
};

function variantFor(pathname: string): Variant {
  if (
    pathname.startsWith("/jobs/") ||
    pathname.startsWith("/apply/") ||
    pathname.startsWith("/messages/")
  )
    return variants.detail;
  if (pathname.startsWith("/messages")) return variants.chat;
  if (
    pathname.startsWith("/profile") ||
    pathname.startsWith("/applications") ||
    pathname.startsWith("/saved") ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/subscription")
  )
    return variants.profile;
  if (
    pathname === "/" ||
    pathname.startsWith("/welcome") ||
    pathname.startsWith("/role")
  )
    return variants.cinematic;
  return variants.feed;
}

export function AppShell({
  children,
  withNav = true,
  className = "",
}: {
  children: React.ReactNode;
  withNav?: boolean;
  className?: string;
}) {
  const { pathname } = useLocation();
  const v = variantFor(pathname);
  return (
    <div className={`min-h-screen bg-background text-ink ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={v.initial}
          animate={v.animate}
          exit={v.exit}
          transition={v.transition}
          className={`mx-auto w-full max-w-md ${withNav ? "pb-32" : ""}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {withNav && <BottomNav />}
    </div>
  );
}
