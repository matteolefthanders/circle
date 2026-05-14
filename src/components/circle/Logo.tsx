import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";

export function Logo({
  size = 28,
  withText = true,
  interactive = true,
}: {
  size?: number;
  withText?: boolean;
  interactive?: boolean;
}) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!interactive) return;
    if (typeof window !== "undefined") {
      localStorage.removeItem("circle:onboarded");
    }
    navigate({ to: "/" });
  };

  const content = (
    <div className="flex items-center gap-2 text-primary">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        initial={{ rotate: -8, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
      >
        <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="20" cy="20" r="4" fill="currentColor" />
      </motion.svg>
      {withText && (
        <span className="font-display text-[15px] font-semibold tracking-[0.28em] text-ink">
          CIRCLE
        </span>
      )}
    </div>
  );

  if (!interactive) return content;

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Torna all'intro CIRCLE"
      className="-m-1 rounded-md p-1 transition-opacity hover:opacity-80 active:opacity-60"
    >
      {content}
    </button>
  );
}
