import { AnimatePresence, motion } from "framer-motion";
import { Copy, Mail, MessageCircle, Send, Share2, X, Check, Link2 } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";

export type ShareSheetProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  url?: string;
};

export function ShareSheet({ open, onClose, title, subtitle, url }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shareUrl =
    url ?? (typeof window !== "undefined" ? window.location.href : "https://circle.app");
  const text = `${title}${subtitle ? ` — ${subtitle}` : ""}`;

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copiato");
      setTimeout(() => setCopied(false), 1600);
    } catch {
      toast.error("Impossibile copiare il link");
    }
  };

  const handleNative = async () => {
    if (typeof navigator !== "undefined" && (navigator as Navigator & { share?: unknown }).share) {
      try {
        await navigator.share({ title, text, url: shareUrl });
        onClose();
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy();
    }
  };

  const actions = [
    {
      key: "copy",
      label: copied ? "Copiato" : "Copia link",
      icon: copied ? Check : Link2,
      onClick: handleCopy,
      tone: copied ? "primary" : "default",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`,
    },
    {
      key: "telegram",
      label: "Telegram",
      icon: Send,
      href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`,
    },
    {
      key: "email",
      label: "Email",
      icon: Mail,
      href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`,
    },
    {
      key: "more",
      label: "Altro",
      icon: Share2,
      onClick: handleNative,
    },
  ] as const;

  const sheet = (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <motion.button
            type="button"
            aria-label="Chiudi"
            className="absolute inset-0 cursor-default bg-ink/60 backdrop-blur-[2px]"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Condividi"
            className="relative z-10 flex max-h-[88vh] w-full max-w-[480px] flex-col rounded-t-[28px] bg-card pb-[max(env(safe-area-inset-bottom),1.5rem)] pt-3 shadow-lift"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 320 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
          >
            <div className="mx-auto h-1.5 w-12 rounded-full bg-foreground/15" />
            <div className="flex items-start justify-between gap-3 px-5 pb-4 pt-4">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-[0.22em] text-ink/45">Condividi</p>
                <h3 className="mt-1 truncate font-display text-lg font-semibold tracking-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="mt-0.5 truncate text-[12px] text-ink/55">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                className="-mr-1 -mt-1 flex size-9 shrink-0 items-center justify-center rounded-full text-ink/60 transition hover:bg-ink/5 active:scale-95"
                aria-label="Chiudi"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex gap-3 overflow-x-auto px-5 pb-4 [&::-webkit-scrollbar]:hidden">
              {actions.map((a) => {
                const Icon = a.icon;
                const tone = "tone" in a && a.tone === "primary";
                const inner = (
                  <>
                    <span
                      className={`flex size-14 items-center justify-center rounded-2xl transition group-active:scale-95 ${
                        tone
                          ? "bg-primary text-primary-foreground"
                          : "bg-ink/[0.06] text-ink group-hover:bg-ink/10"
                      }`}
                    >
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[11px] text-ink/70">{a.label}</span>
                  </>
                );
                if ("href" in a) {
                  return (
                    <a
                      key={a.key}
                      href={a.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={onClose}
                      className="group flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                    >
                      {inner}
                    </a>
                  );
                }
                return (
                  <button
                    key={a.key}
                    type="button"
                    onClick={a.onClick}
                    className="group flex w-[72px] shrink-0 flex-col items-center gap-1.5"
                  >
                    {inner}
                  </button>
                );
              })}
            </div>

            <div className="mx-5 flex items-center gap-2 rounded-2xl border border-ink/10 bg-paper/60 py-1.5 pl-3 pr-1.5">
              <Copy className="size-3.5 shrink-0 text-ink/40" />
              <span className="truncate text-[12px] text-ink/70">{shareUrl}</span>
              <button
                onClick={handleCopy}
                className="ml-auto shrink-0 rounded-full bg-ink px-3 py-1.5 text-[11px] font-medium text-paper transition active:scale-95"
              >
                {copied ? "Copiato" : "Copia"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted || typeof document === "undefined") return null;
  return createPortal(sheet, document.body);
}
