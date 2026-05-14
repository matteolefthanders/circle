import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

/**
 * Compact filter strip: scrollable category chips on the left,
 * a single right-aligned "Filtri" pill that reveals secondary filters
 * (e.g. geo) in a popover below.
 */
export function FilterBar<C extends string, G extends string>({
  categories,
  category,
  onCategory,
  geos,
  geo,
  onGeo,
  geoLabel = "Filtri",
  layoutId = "fb-pill",
  categoryLabel,
}: {
  categories: readonly C[];
  category: C;
  onCategory: (c: C) => void;
  geos: readonly G[];
  geo: G;
  onGeo: (g: G) => void;
  geoLabel?: string;
  layoutId?: string;
  categoryLabel?: (c: C) => string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div className="flex items-center gap-2">
        {/* scrollable categories */}
        <div className="-mx-5 flex-1 overflow-x-auto px-5 no-scrollbar">
          <div className="flex gap-2 pb-1 pr-1">
            {categories.map((c) => {
              const active = c === category;
              return (
                <button
                  key={c}
                  onClick={() => onCategory(c)}
                  className={`relative whitespace-nowrap rounded-full px-3.5 py-1.5 text-[12px] font-medium transition ${
                    active ? "text-paper" : "text-ink/60"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId={layoutId}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-ink"
                    />
                  )}
                  <span className="relative z-10">
                    {categoryLabel ? categoryLabel(c) : c}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* right side: compact filter pill */}
        <button
          onClick={() => setOpen((o) => !o)}
          className={`relative inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${
            open
              ? "border-primary/40 bg-primary text-primary-foreground"
              : "border-ink/10 bg-card text-ink/75 shadow-soft"
          }`}
          aria-label={geoLabel}
        >
          <SlidersHorizontal className="size-3.5" />
          <span className="tracking-tight">{geo}</span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              aria-label="Chiudi filtri"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-30"
            />
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 z-40 mt-2 w-[260px] rounded-2xl border border-ink/10 bg-card p-3 shadow-float"
            >
              <p className="mb-2 px-1 text-[10px] uppercase tracking-[0.2em] text-ink/45">
                Località
              </p>
              <div className="flex flex-wrap gap-1.5">
                {geos.map((g) => {
                  const active = g === geo;
                  return (
                    <button
                      key={g}
                      onClick={() => {
                        onGeo(g);
                        setOpen(false);
                      }}
                      className={`whitespace-nowrap rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
                        active
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-ink/10 bg-paper text-ink/70"
                      }`}
                    >
                      {g}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
