import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export function FiltersSheet<C extends string, G extends string>({
  open,
  onClose,
  title = "Filtri",
  categories,
  category,
  onCategory,
  categoryLabel,
  categoryTitle = "Categoria",
  geos,
  geo,
  onGeo,
  geoTitle = "Località",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  categories: readonly C[];
  category: C;
  onCategory: (c: C) => void;
  categoryLabel?: (c: C) => string;
  categoryTitle?: string;
  geos: readonly G[];
  geo: G;
  onGeo: (g: G) => void;
  geoTitle?: string;
}) {
  // Lock body scroll + esc to close
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

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
        >
          <button
            type="button"
            aria-label="Chiudi filtri"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-foreground/55 backdrop-blur-[3px]"
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120 || info.velocity.y > 600) onClose();
            }}
            className="relative z-10 flex max-h-[88vh] w-full max-w-md flex-col rounded-t-[28px] bg-popover pb-[max(env(safe-area-inset-bottom),24px)] shadow-lift"
          >
            <div className="pt-3">
              <span className="mx-auto block h-1.5 w-12 rounded-full bg-foreground/15" />
            </div>

            <div className="flex items-center justify-between px-6 pt-3">
              <h3 className="font-display text-[20px] font-semibold tracking-tight text-foreground">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="inline-flex size-9 items-center justify-center rounded-full bg-foreground/[0.06] text-foreground/70 transition hover:bg-foreground/10 active:scale-95"
                aria-label="Chiudi"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-2 pt-2">
              <div className="mt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                  {categoryTitle}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {categories.map((c) => {
                    const active = c === category;
                    return (
                      <button
                        key={c}
                        onClick={() => onCategory(c)}
                        className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                          active
                            ? "border-foreground bg-foreground text-background"
                            : "border-foreground/15 bg-background text-foreground/80 hover:bg-foreground/[0.04]"
                        }`}
                      >
                        {categoryLabel ? categoryLabel(c) : c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/55">
                  {geoTitle}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {geos.map((g) => {
                    const active = g === geo;
                    return (
                      <button
                        key={g}
                        onClick={() => onGeo(g)}
                        className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                          active
                            ? "border-primary/40 bg-primary/10 text-primary"
                            : "border-foreground/15 bg-background text-foreground/80 hover:bg-foreground/[0.04]"
                        }`}
                      >
                        {g}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="px-6 pt-3">
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-primary py-3.5 text-[14px] font-semibold text-primary-foreground shadow-ember transition active:scale-[0.98]"
              >
                Applica filtri
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
