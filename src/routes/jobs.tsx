import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Bell, Search, SlidersHorizontal } from "lucide-react";
import { Logo } from "@/components/circle/Logo";
import { JobCard } from "@/components/circle/JobCard";
import { AppShell } from "@/components/circle/AppShell";
import { FiltersSheet } from "@/components/circle/FiltersSheet";
import { CATEGORIES, JOBS, REALMS, type Realm, GEO_QUICK, VENDORS, LOCATIONS } from "@/lib/mock-data";
import { useLocal } from "@/lib/use-local";
import { BadgeCheck, MapPin, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/jobs")({
  head: () => ({
    meta: [
      { title: "Scopri — CIRCLE" },
      {
        name: "description",
        content:
          "Casting, troupe, fornitori e location selezionati per l'industria audiovisiva europea.",
      },
    ],
  }),
  component: JobsHome,
});

const REALM_LABEL: Record<Realm, string> = {
  casting: "Casting",
  production: "Produzione",
};

const CATEGORY_LABEL: Record<(typeof CATEGORIES)[number], string> = {
  All: "Tutti",
  Acting: "Recitazione",
  UGC: "UGC",
  Crew: "Troupe",
  Voice: "Voce",
  Production: "Produzione",
};

function JobsHome() {
  const [realm, setRealm] = useLocal<Realm>("circle:realm", "casting");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [geo, setGeo] = useState<(typeof GEO_QUICK)[number]>("Italia");
  const [saved, setSaved] = useLocal<string[]>("circle:saved", []);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const list = useMemo(
    () => (cat === "All" ? JOBS : JOBS.filter((j) => j.category === cat)),
    [cat],
  );

  return (
    <AppShell>
      <header className="sticky top-0 z-20 bg-background/85 px-5 pb-3 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-1.5">
            <IconBtn to="/search" label="Cerca"><Search className="size-[18px]" /></IconBtn>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              aria-label="Filtri"
              className="relative inline-flex size-10 items-center justify-center rounded-full bg-card text-ink/80 shadow-soft active:scale-95"
            >
              <SlidersHorizontal className="size-[18px]" />
              {(cat !== "All" || geo !== "Italia") && (
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
              )}
            </button>
            <IconBtn to="/notifications" label="Notifiche">
              <Bell className="size-[18px]" />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
            </IconBtn>
          </div>
        </div>

        {/* Realm segmented switcher */}
        <div className="mt-4 grid grid-cols-2 gap-1 rounded-2xl border border-foreground/10 bg-foreground/[0.04] p-1">
          {REALMS.map((r) => {
            const active = r.id === realm;
            return (
              <button
                key={r.id}
                onClick={() => setRealm(r.id)}
                className={`relative rounded-xl py-2 text-[13px] font-semibold transition ${
                  active ? "text-white" : "border border-foreground/15 bg-card text-foreground/80 shadow-soft"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="realm-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-xl shadow-ember"
                    style={{ background: "var(--gradient-ember)" }}
                  />
                )}
                <span className="relative z-10">{REALM_LABEL[r.id]}</span>
              </button>
            );
          })}
        </div>
      </header>

      {realm === "casting" && (
        <FiltersSheet
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          categories={CATEGORIES}
          category={cat}
          onCategory={setCat}
          categoryLabel={(c) => CATEGORY_LABEL[c]}
          geos={GEO_QUICK}
          geo={geo}
          onGeo={setGeo}
        />
      )}

      <AnimatePresence mode="wait">
        {realm === "casting" ? (
          <motion.section
            key="casting"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="px-5 pt-4"
          >
            <h2 className="mb-3 font-display text-[20px] font-semibold tracking-tight">
              {cat === "All" ? "Selezionati per te" : `Opportunità · ${CATEGORY_LABEL[cat]}`}
            </h2>

            <div className="space-y-4">
              {list.map((j, i) => (
                <JobCard
                  key={j.id}
                  job={j}
                  index={i}
                  saved={saved.includes(j.id)}
                  onToggleSave={() =>
                    setSaved((prev) =>
                      prev.includes(j.id) ? prev.filter((x) => x !== j.id) : [...prev, j.id],
                    )
                  }
                />
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.section
            key="production"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="px-5 pt-4"
          >
            <Link
              to="/marketplace"
              className="relative mb-5 block overflow-hidden rounded-3xl bg-ink p-5 text-paper shadow-float"
            >
              <p className="text-[11px] uppercase tracking-[0.22em] opacity-70">
                Mercato della produzione
              </p>
              <h2 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
                Troupe, fornitori, attrezzatura e location.
              </h2>
              <p className="mt-1 text-[13px] opacity-75">
                Pensato per film indipendenti, serie e branded content.
              </p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-4 py-1.5 text-[12px] font-medium text-paper">
                Esplora il mercato <ArrowRight className="size-3.5" />
              </span>
            </Link>

            <h2 className="mb-3 font-display text-[20px] font-semibold tracking-tight">
              Troupe in evidenza · Italia
            </h2>
            <div className="space-y-3">
              {VENDORS.slice(0, 3).map((v, i) => (
                <motion.div
                  key={v.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft"
                >
                  <div
                    className="size-14 shrink-0 rounded-xl"
                    style={{ background: v.cover }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="truncate text-[14px] font-medium tracking-tight">
                        {v.name}
                      </p>
                      {v.verified && <BadgeCheck className="size-3.5 text-primary" />}
                    </div>
                    <p className="truncate text-[12px] text-ink/55">{v.role}</p>
                    <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] text-ink/45">
                      <MapPin className="size-3" />
                      {v.city}
                    </p>
                  </div>
                  <p className="text-right text-[12px] font-semibold tracking-tight">
                    {v.rate.split("/")[0]}
                    <span className="block text-[10px] font-normal text-ink/45">/giorno</span>
                  </p>
                </motion.div>
              ))}
            </div>

            <h2 className="mb-3 mt-7 font-display text-[20px] font-semibold tracking-tight">
              Location
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {LOCATIONS.slice(0, 4).map((l, i) => (
                <motion.div
                  key={l.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="relative aspect-[3/4] overflow-hidden rounded-2xl text-paper shadow-soft"
                  style={{ background: l.cover }}
                >
                  {l.photo && (
                    <img
                      src={l.photo}
                      alt={l.name}
                      loading="lazy"
                      width={768}
                      height={1024}
                      className="absolute inset-0 size-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(10,10,20,0.82))]" />
                  <div className="absolute inset-x-3 bottom-3">
                    <p className="text-[9px] uppercase tracking-[0.18em] opacity-80">
                      {l.area} · {l.city}
                    </p>
                    <h3 className="mt-0.5 line-clamp-1 text-[13px] font-semibold tracking-tight">
                      {l.name}
                    </h3>
                    <p className="text-[11px] font-medium opacity-90">{l.rate}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link
              to="/marketplace"
              className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary"
            >
              Apri il mercato completo <ArrowRight className="size-3.5" />
            </Link>
          </motion.section>
        )}
      </AnimatePresence>
    </AppShell>
  );
}


function IconBtn({ to, label, children }: { to: string; label: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      aria-label={label}
      className="relative inline-flex size-10 items-center justify-center rounded-full bg-card text-ink/80 shadow-soft active:scale-95"
    >
      {children}
    </Link>
  );
}
