import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { BadgeCheck, MapPin, Calendar, Search, ArrowRight, SlidersHorizontal } from "lucide-react";
import { AppShell } from "@/components/circle/AppShell";
import { Chip } from "@/components/circle/Chip";
import { Logo } from "@/components/circle/Logo";
import { FiltersSheet } from "@/components/circle/FiltersSheet";
import { VENDORS, LOCATIONS, GEO_QUICK, type Vendor, type Location } from "@/lib/mock-data";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Mercato — CIRCLE" },
      {
        name: "description",
        content:
          "Troupe, fornitori, location e attrezzature per cinema e TV in tutta Europa.",
      },
    ],
  }),
  component: MarketplacePage,
});

const TABS = ["Crew", "Vendor", "Location", "Equipment", "Vehicles", "Stuff", "Catering"] as const;
type Tab = (typeof TABS)[number];

const TAB_LABEL: Record<Tab, string> = {
  Crew: "Troupe",
  Vendor: "Fornitori",
  Location: "Location",
  Equipment: "Attrezzatura",
  Vehicles: "Veicoli di scena",
  Stuff: "Materiali & servizi",
  Catering: "Catering",
};

function MarketplacePage() {
  const [tab, setTab] = useState<Tab>("Crew");
  const [geo, setGeo] = useState<(typeof GEO_QUICK)[number]>("Italia");
  const [quoteFor, setQuoteFor] = useState<Vendor | Location | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const isLocations = tab === "Location";

  const filteredVendors = useMemo(
    () =>
      VENDORS.filter((v) => v.category === tab).filter((v) =>
        geo === "Italia" ? true : geo === "Europa" || geo === "Remoto" ? true : v.city === geo,
      ),
    [tab, geo],
  );

  const filteredLocations = useMemo(
    () =>
      LOCATIONS.filter((l) =>
        geo === "Italia" || geo === "Europa" || geo === "Remoto" ? true : l.city === geo,
      ),
    [geo],
  );

  return (
    <AppShell>
      <header className="sticky top-0 z-20 bg-background/85 px-5 pb-3 pt-5 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-1.5">
            <Link
              to="/search"
              className="inline-flex size-10 items-center justify-center rounded-full bg-card shadow-soft active:scale-95"
              aria-label="Cerca"
            >
              <Search className="size-[18px]" />
            </Link>
            <button
              type="button"
              onClick={() => setFiltersOpen(true)}
              aria-label="Filtri"
              className="relative inline-flex size-10 items-center justify-center rounded-full bg-card text-ink/80 shadow-soft active:scale-95"
            >
              <SlidersHorizontal className="size-[18px]" />
              {(tab !== "Crew" || geo !== "Italia") && (
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
              )}
            </button>
          </div>
        </div>

        <div className="mt-3">
          <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">Mercato</p>
          <h1 className="mt-1 font-display text-[26px] font-semibold tracking-tight">
            L'industria del cinema, a portata di mano.
          </h1>
          <p className="mt-2 text-[12px] text-ink/55">
            {TAB_LABEL[tab]} · {geo}
          </p>
        </div>
      </header>

      <FiltersSheet
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        categories={TABS}
        category={tab}
        onCategory={setTab}
        categoryLabel={(c) => TAB_LABEL[c]}
        geos={GEO_QUICK}
        geo={geo}
        onGeo={setGeo}
      />


      <section className="px-5 pt-4">
        <Link
          to="/film-commission"
          className="mb-4 flex items-center justify-between rounded-3xl bg-gradient-to-br from-ink to-primary p-4 text-paper shadow-float active:scale-[0.99]"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] opacity-75">
              Nuovo · Film Commission
            </p>
            <p className="mt-0.5 font-display text-[16px] font-semibold tracking-tight">
              Tax credit fino al 40% per girare in Italia e in Europa
            </p>
          </div>
          <span className="ml-3 shrink-0 rounded-full bg-paper/15 px-3 py-1.5 text-[11px] font-medium">
            Esplora →
          </span>
        </Link>

        {isLocations ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredLocations.map((l, i) => (
              <LocationCard key={l.id} loc={l} index={i} onQuote={() => setQuoteFor(l)} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredVendors.length === 0 ? (
              <div className="rounded-3xl bg-card p-10 text-center shadow-soft">
                <p className="text-[14px] text-ink/55">
                  Nessun risultato per “{TAB_LABEL[tab]}” a {geo}.
                </p>
                <p className="mt-1 text-[12px] text-ink/45">Nuovi partner verificati ogni settimana.</p>
              </div>
            ) : (
              filteredVendors.map((v, i) => (
                <VendorCard key={v.id} v={v} index={i} onQuote={() => setQuoteFor(v)} />
              ))
            )}
          </div>
        )}
      </section>

      <AnimatePresence>
        {quoteFor && <RequestQuoteSheet item={quoteFor} onClose={() => setQuoteFor(null)} />}
      </AnimatePresence>
    </AppShell>
  );
}

function VendorCard({
  v,
  index,
  onQuote,
}: {
  v: Vendor;
  index: number;
  onQuote: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-3xl bg-card shadow-soft"
    >
      <div className="flex gap-3 p-3">
        <div
          className="size-20 shrink-0 rounded-2xl"
          style={{ background: v.cover }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-[15px] font-semibold tracking-tight">{v.name}</h3>
            {v.verified && <BadgeCheck className="size-3.5 text-primary" />}
          </div>
          <p className="truncate text-[12px] text-ink/55">{v.role}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-ink/55">
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {v.city}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3" />
              {v.availability}
            </span>
          </div>
        </div>
      </div>
      <p className="line-clamp-2 px-4 text-[12.5px] leading-relaxed text-ink/65">{v.bio}</p>
      <div className="mt-3 flex flex-wrap gap-1.5 px-4">
        {v.tags.map((t) => (
          <Chip key={t} tone="outline">
            {t}
          </Chip>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-ink/[0.06] px-4 py-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-ink/45">Tariffa / giorno</p>
          <p className="text-[13.5px] font-semibold tracking-tight">{v.rate}</p>
        </div>
        <button
          onClick={onQuote}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3.5 py-2 text-[12px] font-medium text-paper active:scale-95"
        >
          Richiedi preventivo
          <ArrowRight className="size-3.5" />
        </button>
      </div>
    </motion.div>
  );
}

function LocationCard({
  loc,
  index,
  onQuote,
}: {
  loc: Location;
  index: number;
  onQuote: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.985 }}
      onClick={onQuote}
      className="group relative aspect-[3/4] overflow-hidden rounded-3xl text-left text-paper shadow-soft"
      style={{ background: loc.cover }}
    >
      {loc.photo && (
        <img
          src={loc.photo}
          alt={loc.name}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(10,10,20,0.82))]" />
      {loc.verified && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-paper/95 px-2 py-0.5 text-[10px] font-medium text-ink">
          <BadgeCheck className="size-3 text-primary" /> Verificata
        </span>
      )}
      <div className="absolute inset-x-3 bottom-3">
        <p className="text-[10px] uppercase tracking-[0.18em] opacity-80">{loc.area} · {loc.city}</p>
        <h3 className="mt-0.5 line-clamp-2 text-[15px] font-semibold tracking-tight">{loc.name}</h3>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[11px] opacity-80">{loc.type}</span>
          <span className="text-[12px] font-semibold">{loc.rate}</span>
        </div>
      </div>
    </motion.button>
  );
}

const QUOTE_STEPS = ["Brief", "Date", "Budget", "Invia"] as const;

function RequestQuoteSheet({
  item,
  onClose,
}: {
  item: Vendor | Location;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [, setQuotes] = useLocal<string[]>("circle:quotes", []);
  const name = item.name;

  const submit = () => {
    setQuotes((p) => (p.includes(item.id) ? p : [...p, item.id]));
    setSent(true);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button
        aria-label="Chiudi"
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="relative w-full max-w-md rounded-t-[28px] bg-paper p-6 shadow-float"
      >
        <div className="mx-auto h-1 w-10 rounded-full bg-ink/15" />
        {sent ? (
          <div className="py-6 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 320 }}
              className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10"
            >
              <BadgeCheck className="size-8 text-primary" />
            </motion.div>
            <h3 className="mt-4 font-display text-[22px] font-semibold tracking-tight">
              Richiesta inviata
            </h3>
            <p className="mt-1 text-[13px] text-ink/60">
              {name} di solito risponde entro 24h. Ti avviseremo.
            </p>
            <button
              onClick={onClose}
              className="mt-5 w-full cta rounded-2xl bg-primary py-3.5 text-[14px] text-primary-foreground"
            >
              Torna al mercato
            </button>
          </div>
        ) : (
          <>
            <div className="mt-4 flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
                Richiesta preventivo
              </p>
              <p className="text-[11px] text-ink/45">
                {step + 1} / {QUOTE_STEPS.length}
              </p>
            </div>
            <h3 className="mt-1 font-display text-[22px] font-semibold tracking-tight">
              {name}
            </h3>

            <div className="mt-5 flex gap-1.5">
              {QUOTE_STEPS.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition ${
                    i <= step ? "bg-primary" : "bg-ink/10"
                  }`}
                />
              ))}
            </div>

            <div className="mt-5 min-h-[160px]">
              {step === 0 && (
                <Field
                  label="Brief di progetto"
                  placeholder="Lungometraggio folk-horror, anamorfico, esterni notte…"
                  textarea
                />
              )}
              {step === 1 && (
                <div className="space-y-3">
                  <Field label="Date riprese" placeholder="8 – 12 gennaio 2026" />
                  <Field label="Prep necessaria" placeholder="2 giorni di prep" />
                </div>
              )}
              {step === 2 && (
                <Field label="Range budget" placeholder="€8.000 – €12.000" />
              )}
              {step === 3 && (
                <div className="rounded-2xl bg-card p-4 shadow-soft">
                  <p className="text-[12px] uppercase tracking-wider text-ink/45">
                    Riepilogo
                  </p>
                  <p className="mt-2 text-[14px] text-ink/80">
                    Stai inviando una richiesta a <strong>{name}</strong>. Riceverà brief,
                    date e budget e potrà rispondere direttamente in Chat.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="flex-1 rounded-2xl bg-card py-3.5 text-[14px] font-medium text-ink shadow-soft"
                >
                  Indietro
                </button>
              )}
              <button
                onClick={() => (step === QUOTE_STEPS.length - 1 ? submit() : setStep((s) => s + 1))}
                className="flex-[2] cta rounded-2xl bg-primary py-3.5 text-[14px] text-primary-foreground"
              >
                {step === QUOTE_STEPS.length - 1 ? "Invia richiesta" : "Continua"}
              </button>
            </div>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({
  label,
  placeholder,
  textarea,
}: {
  label: string;
  placeholder: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-wider text-ink/45">{label}</span>
      {textarea ? (
        <textarea
          rows={4}
          placeholder={placeholder}
          className="mt-1.5 w-full resize-none rounded-2xl border border-ink/10 bg-card px-4 py-3 text-[14px] outline-none placeholder:text-ink/30 focus:border-primary/40"
        />
      ) : (
        <input
          placeholder={placeholder}
          className="mt-1.5 w-full rounded-2xl border border-ink/10 bg-card px-4 py-3 text-[14px] outline-none placeholder:text-ink/30 focus:border-primary/40"
        />
      )}
    </label>
  );
}
