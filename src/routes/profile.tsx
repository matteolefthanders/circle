import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Settings, Edit3, Film, Link as LinkIcon, Mail } from "lucide-react";
import { AppShell } from "@/components/circle/AppShell";
import { Chip } from "@/components/circle/Chip";
import { useLocal } from "@/lib/use-local";
import penguinAvatar from "@/assets/red-penguin-avatar.jpg";
import penguinLogo from "@/assets/red-penguin-logo.jpg";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profilo — CIRCLE" }] }),
  component: Profile,
});

function Profile() {
  const [name, setName] = useLocal<string>("circle:name", "Guido Gargiullo");
  const [bio, setBio] = useLocal<string>(
    "circle:bio",
    "CEO & Founder di Red Penguin Productions. Production Manager con oltre 15 anni tra cinema, serie TV e produzioni internazionali — da Spectre (2015) ai più recenti Il Mostro, L'Infinito e Watchful Eyes. Attualmente in pre-produzione su SuburraMaxima.",
  );
  const [editing, setEditing] = useLocal<boolean>("circle:editing", false);
  const [applied] = useLocal<string[]>("circle:applied", []);
  const [saved] = useLocal<string[]>("circle:saved", []);

  return (
    <AppShell>
      <div
        className="relative h-56 w-full bg-black bg-cover bg-center"
        style={{ backgroundImage: `url(${penguinLogo})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.55)_55%,var(--background)_100%)]" />
        <div className="absolute right-5 top-12 flex gap-2">
          <button
            onClick={() => setEditing(!editing)}
            className="glass-dark flex size-9 items-center justify-center rounded-full text-paper"
            aria-label="Modifica"
          >
            <Edit3 className="size-4" />
          </button>
          <Link to="/settings" className="glass-dark flex size-9 items-center justify-center rounded-full text-paper" aria-label="Impostazioni">
            <Settings className="size-4" />
          </Link>
        </div>
      </div>

      <div className="relative -mt-16 px-5">
        <motion.img
          src={penguinAvatar}
          alt="Guido Gargiullo — Red Penguin Productions"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="size-28 rounded-full border-4 border-background bg-black object-cover shadow-float"
        />
        <div className="mt-4">
          {editing ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent font-display text-[28px] font-semibold tracking-tight outline-none"
            />
          ) : (
            <h1 className="font-display text-[28px] font-semibold tracking-tight">{name}</h1>
          )}
          <p className="text-[13px] text-ink/55">
            CEO · Red Penguin Productions · Roma, Italia
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <Chip tone="primary">CEO Red Penguin</Chip>
            <Chip tone="primary">Verificato</Chip>
            <Chip tone="outline">Disponibile da Q1 2026</Chip>
          </div>

          {editing ? (
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="mt-4 h-28 w-full resize-none rounded-2xl border border-ink/10 bg-card p-3 text-[14px] leading-relaxed outline-none"
            />
          ) : (
            <p className="mt-4 text-[14px] leading-relaxed text-ink/75">{bio}</p>
          )}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat label="Crediti IMDb" value={27} />
          <Stat label="Produzioni" value={applied.length || 14} />
          <Stat label="Anni di carriera" value="15+" />
        </div>

        <Section title="Modalità produttore">
          <Link
            to="/producer"
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-black p-3 text-paper shadow-soft transition active:scale-[0.99]"
          >
            <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-primary/25 blur-2xl" />
            <img
              src={penguinAvatar}
              alt="Red Penguin"
              className="relative size-11 shrink-0 rounded-xl bg-black object-cover ring-1 ring-paper/10"
            />
            <div className="relative min-w-0 flex-1">
              <p className="font-display text-[14.5px] font-semibold leading-tight tracking-tight">
                Red Penguin Productions
              </p>
              <p className="text-[11.5px] text-paper/60">
                Apri dashboard azienda
              </p>
            </div>
            <span className="relative shrink-0 rounded-full bg-primary px-3 py-1.5 text-[11px] font-medium text-primary-foreground transition group-active:bg-primary/90">
              Apri →
            </span>
          </Link>
        </Section>

        <Section title="In lavorazione">
          <div className="rounded-2xl bg-card p-4 shadow-soft">
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary">
              Pre-produzione · 2026
            </p>
            <p className="mt-1 font-display text-[17px] font-semibold tracking-tight">
              SuburraMaxima
            </p>
            <p className="text-[12px] text-ink/55">
              Serie TV · 6 episodi — Production Manager
            </p>
          </div>
        </Section>

        <Section title="Opere principali">
          <ul className="space-y-3 text-[14px]">
            {[
              { t: "Spectre", y: "2015", c: "Eon Productions · Trasporti", flag: "🇬🇧" },
              { t: "Le tre rose di Eva", y: "2012–15", c: "Serie TV · Reparto produzione · 40 ep.", flag: "🇮🇹" },
              { t: "Watchful Eyes", y: "2025", c: "Produzione", flag: "🇺🇸" },
              { t: "Adagio (Sollima)", y: "2023", c: "Direzione della produzione", flag: "🇮🇹" },
              { t: "Il Mostro", y: "2025", c: "Mini serie · Production Manager · 4 ep.", flag: "🇮🇹" },
              { t: "L'Infinito", y: "2025", c: "Production Manager", flag: "🇮🇹" },
              { t: "Lolita Lobosco", y: "2023", c: "Serie TV · Production Manager · 6 ep.", flag: "🇮🇹" },
              { t: "Il Dio dell'amore", y: "2026", c: "Production Manager", flag: "🇮🇹" },
            ].map((c) => (
              <li key={c.t} className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium tracking-tight">
                    <span className="mr-1.5">{c.flag}</span>
                    {c.t}
                  </p>
                  <p className="truncate text-[12px] text-ink/55">{c.c}</p>
                </div>
                <span className="shrink-0 text-[12px] text-ink/45">{c.y}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Competenze">
          <div className="flex flex-wrap gap-2">
            {[
              "Direzione della produzione",
              "Production Manager",
              "Budgeting & scheduling",
              "Movie Magic",
              "Coproduzioni internazionali",
              "Logistica trasporti",
              "Location management",
              "Italiano",
              "Inglese",
            ].map((s) => (
              <Chip key={s} tone="outline">
                {s}
              </Chip>
            ))}
          </div>
        </Section>

        <Section title="Link">
          <div className="space-y-2">
            <LinkRow icon={Film} label="IMDb · Guido Gargiullo" sub="nm8267207" />
            <LinkRow icon={LinkIcon} label="IMDbPro · Profilo professionale" sub="pro.imdb.com" />
            <LinkRow icon={Mail} label="Contatti gestiti tramite agenzia" sub="Richiedi via Circle" />
          </div>
        </Section>

        <Section title={`Salvati (${saved.length})`}>
          <p className="text-[13px] text-ink/55">
            <Link to="/saved" className="text-primary">Vedi progetti salvati →</Link>
          </p>
        </Section>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <p className="font-display text-[22px] font-semibold tracking-tight">{value}</p>
      <p className="text-[11px] uppercase tracking-wider text-ink/45">{label}</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-ink/[0.06] py-6">
      <h3 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-ink/45">{title}</h3>
      {children}
    </section>
  );
}

function LinkRow({
  icon: Icon,
  label,
  sub,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub?: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-soft">
      <Icon className="size-4 text-ink/55" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px]">{label}</p>
        {sub && <p className="truncate text-[11px] text-ink/45">{sub}</p>}
      </div>
    </div>
  );
}
