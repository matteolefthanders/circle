import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BadgeCheck,
  MapPin,
  Globe,
  Mail,
  Instagram,
  Film,
  Users,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { AppShell } from "@/components/circle/AppShell";
import { Chip } from "@/components/circle/Chip";
import { JOBS } from "@/lib/mock-data";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Quiet Room Studio — CIRCLE" },
      {
        name: "description",
        content:
          "Casa di produzione indipendente con base a Roma. Cinema d'autore, serie e branded content per il mercato italiano ed europeo.",
      },
    ],
  }),
  component: StudioProfile,
});

function StudioProfile() {
  return (
    <AppShell>
      {/* Cover */}
      <div
        className="relative h-60 w-full"
        style={{
          background:
            "linear-gradient(135deg,#0E0E1A 0%,#3a1418 55%,#8E0E14 100%)",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.08),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,var(--background))]" />
        <header className="relative flex items-center justify-between px-5 pt-12">
          <Link
            to="/producer"
            className="glass-dark flex size-10 items-center justify-center rounded-full text-paper"
            aria-label="Indietro"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <p className="text-[11px] uppercase tracking-[0.22em] text-paper/70">
            Profilo produttore
          </p>
          <div className="size-10" />
        </header>
      </div>

      <div className="relative -mt-16 px-5">
        {/* Logo + meta */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="flex size-28 items-center justify-center rounded-3xl border-4 border-background bg-paper font-display text-[28px] font-semibold tracking-[0.06em] text-ink shadow-float"
        >
          QR
        </motion.div>

        <div className="mt-4 flex items-center gap-1.5">
          <h1 className="font-display text-[28px] font-semibold tracking-tight">
            Quiet Room Studio
          </h1>
          <BadgeCheck className="size-5 text-primary" />
        </div>
        <p className="mt-0.5 inline-flex items-center gap-1.5 text-[13px] text-ink/55">
          <MapPin className="size-3.5" /> Roma, Italia · Casa di produzione
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Chip tone="primary">Verificato</Chip>
          <Chip>Studio</Chip>
          <Chip tone="outline">Casting attivi · 3</Chip>
          <Chip tone="outline">Risponde entro 24h</Chip>
        </div>

        <p className="mt-4 text-[14px] leading-relaxed text-ink/75">
          Casa di produzione indipendente con base a Roma. Sviluppiamo cinema
          d'autore, serie originali e branded content per il mercato italiano
          ed europeo. Dal 2017, otto lungometraggi e oltre quaranta corti.
        </p>

        <div className="mt-5 flex gap-2">
          <button className="flex-[2] cta rounded-2xl bg-primary py-3.5 text-[14px] text-primary-foreground active:scale-95">
            Segui lo studio
          </button>
          <Link
            to="/messages"
            className="flex-1 rounded-2xl border border-ink/15 bg-card py-3.5 text-center text-[14px] font-medium text-ink shadow-soft active:scale-95"
          >
            Contatta
          </Link>
        </div>

        {/* KPI strip */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          <Stat icon={Film} value={28} label="Produzioni" />
          <Stat icon={Users} value="42" label="Team / Crew" />
          <Stat icon={Calendar} value="2017" label="Fondazione" />
        </div>

        {/* Active castings */}
        <Section
          title="Casting aperti"
          action={
            <Link
              to="/jobs"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-primary"
            >
              Vedi tutti <ArrowRight className="size-3" />
            </Link>
          }
        >
          <div className="space-y-3">
            {JOBS.slice(0, 3).map((j, i) => (
              <motion.div
                key={j.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="overflow-hidden rounded-2xl bg-card shadow-soft"
              >
                <div className="flex gap-3 p-3">
                  <div
                    className="size-16 shrink-0 rounded-xl"
                    style={{ background: j.cover }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold tracking-tight">
                      {j.title}
                    </p>
                    <p className="truncate text-[12px] text-ink/55">
                      {j.location} · {j.roles} ruoli
                    </p>
                    <p className="mt-1 text-[12px] font-medium text-ink/70">
                      {j.budget}
                    </p>
                  </div>
                  <Link
                    to="/jobs/$id"
                    params={{ id: j.id }}
                    className="self-center rounded-full bg-ink px-3 py-1.5 text-[11px] font-medium text-paper"
                  >
                    Apri
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Filmography */}
        <Section title="Filmografia selezionata">
          <ul className="space-y-3 text-[14px]">
            {[
              { t: "L'anno silenzioso", y: "2024", c: "Lungometraggio · Venezia Orizzonti" },
              { t: "Notturno", y: "2023", c: "Lungometraggio · in coproduzione FR/IT" },
              { t: "Midnight Frequencies", y: "2023", c: "Serie audio · 8 episodi" },
              { t: "Voci sotto vetro", y: "2022", c: "Corto · Locarno Pardi di domani" },
              { t: "Sangue chiaro", y: "2021", c: "Documentario · Prime Video IT" },
            ].map((c) => (
              <li key={c.t} className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium tracking-tight">{c.t}</p>
                  <p className="truncate text-[12px] text-ink/55">{c.c}</p>
                </div>
                <span className="shrink-0 text-[12px] text-ink/45">{c.y}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* Team */}
        <Section title="Team chiave">
          <div className="space-y-2">
            {[
              { n: "Sofia Marconi", r: "Producer / Founder" },
              { n: "Luca De Carli", r: "Head of Development" },
              { n: "Guido Gargiullo", r: "Production Manager" },
              { n: "Iris Bencini", r: "Casting Director" },
            ].map((m) => (
              <div
                key={m.n}
                className="flex items-center gap-3 rounded-2xl bg-card px-3 py-2.5 shadow-soft"
              >
                <div
                  className="flex size-9 items-center justify-center rounded-full font-display text-[12px] font-semibold text-paper"
                  style={{
                    background:
                      "linear-gradient(135deg,#0E0E1A,#8E0E14)",
                  }}
                >
                  {m.n
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13.5px] font-medium tracking-tight">
                    {m.n}
                  </p>
                  <p className="truncate text-[11.5px] text-ink/55">{m.r}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Genres */}
        <Section title="Generi & specialità">
          <div className="flex flex-wrap gap-2">
            {[
              "Cinema d'autore",
              "Folk horror",
              "Drammatico",
              "Documentario",
              "Branded content",
              "Coproduzioni EU",
              "Anamorfico",
            ].map((s) => (
              <Chip key={s} tone="outline">
                {s}
              </Chip>
            ))}
          </div>
        </Section>

        {/* Links */}
        <Section title="Contatti & link">
          <div className="space-y-2">
            <LinkRow icon={Globe} label="quietroom.studio" sub="Sito ufficiale" />
            <LinkRow icon={Instagram} label="@quietroom.studio" sub="Instagram" />
            <LinkRow icon={Film} label="IMDbPro · Quiet Room" sub="Profilo azienda" />
            <LinkRow icon={Mail} label="hello@quietroom.studio" sub="Contatto pubblico" />
          </div>
        </Section>
      </div>
    </AppShell>
  );
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string | number;
  label: string;
}) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-soft">
      <Icon className="size-4 text-primary" />
      <p className="mt-2 font-display text-[22px] font-semibold tracking-tight">
        {value}
      </p>
      <p className="text-[11px] uppercase tracking-wider text-ink/45">
        {label}
      </p>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-ink/[0.06] py-6">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink/45">
          {title}
        </h3>
        {action}
      </div>
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
