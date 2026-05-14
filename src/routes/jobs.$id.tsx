import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Bookmark, MapPin, Calendar, Users, Share2, ChevronRight, Clock, Wallet, UserSquare2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { JOBS, type Job, type OpenRole } from "@/lib/mock-data";
import { Chip } from "@/components/circle/Chip";
import { ShareSheet } from "@/components/circle/ShareSheet";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/jobs/$id")({
  head: ({ params }) => {
    const job = JOBS.find((j) => j.id === params.id);
    return {
      meta: [
        { title: job ? `${job.title} — CIRCLE` : "Progetto — CIRCLE" },
        { name: "description", content: job?.description ?? "Opportunità di casting e produzione su CIRCLE." },
      ],
    };
  },
  loader: ({ params }) => {
    const job = JOBS.find((j) => j.id === params.id);
    if (!job) throw notFound();
    return { job };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center p-8 text-center">
      <div>
        <h1 className="font-display text-2xl">Progetto non trovato</h1>
        <Link to="/jobs" className="mt-3 inline-block text-primary">← Torna ai progetti</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="p-8 text-center"><p>{error.message}</p></div>
  ),
  component: JobDetail,
});

function JobDetail() {
  const { job } = Route.useLoaderData() as { job: Job };
  const navigate = useNavigate();
  const [saved, setSaved] = useLocal<string[]>("circle:saved", []);
  const isSaved = saved.includes(job.id);
  const [shareOpen, setShareOpen] = useState(false);
  const handleSave = () => {
    setSaved((p) => (p.includes(job.id) ? p.filter((x) => x !== job.id) : [...p, job.id]));
    toast.success(isSaved ? "Rimosso dai salvati" : "Salvato", { description: job.title });
  };

  return (
    <div className="min-h-screen bg-background pb-32 text-ink">
      <div
        className="relative h-[58vh] min-h-[420px] w-full overflow-hidden"
        style={{ background: job.cover }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,20,0.2)_0%,transparent_30%,rgba(10,10,20,0.85)_100%)]" />
        <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 pt-12">
          <button
            onClick={() => navigate({ to: "/jobs" })}
            className="glass-dark flex size-10 items-center justify-center rounded-full text-paper"
            aria-label="Indietro"
          >
            <ArrowLeft className="size-4" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="glass-dark flex size-10 items-center justify-center rounded-full text-paper"
              aria-label="Salva"
            >
              <Bookmark className={`size-4 ${isSaved ? "fill-paper" : ""}`} />
            </button>
            <button
              onClick={() => setShareOpen(true)}
              className="glass-dark flex size-10 items-center justify-center rounded-full text-paper"
              aria-label="Condividi"
            >
              <Share2 className="size-4" />
            </button>
          </div>
        </div>
        <ShareSheet
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          title={job.title}
          subtitle={job.company}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 bottom-0 p-6 text-paper"
        >
          <div className="mb-3 flex flex-wrap gap-1.5">
            {job.featured && <Chip tone="primary">In evidenza</Chip>}
            {job.remote && <span className="rounded-full bg-paper/15 px-2.5 py-1 text-[11px] font-medium text-paper backdrop-blur">Remoto</span>}
          </div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-paper/70">{job.company}</p>
          <h1 className="mt-1 font-display text-[32px] font-semibold leading-[1.05] tracking-tight">
            {job.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12px] text-paper/85">
            <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" />{job.location}</span>
            <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" />Scadenza {job.deadline}</span>
            <span className="inline-flex items-center gap-1.5"><Users className="size-3.5" />{job.roles} ruoli</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative -mt-6 rounded-t-[28px] bg-background px-6 pt-7"
      >
        <Section title="Sinossi"><p className="text-[14px] leading-relaxed text-ink/75">{job.synopsis}</p></Section>

        <section className="border-b border-ink/[0.06] py-5">
          <div className="mb-3 flex items-baseline justify-between">
            <h3 className="text-[11px] uppercase tracking-[0.2em] text-ink/45">Ruoli aperti</h3>
            <span className="text-[11px] text-ink/50">
              {(job.openRoles?.length ?? job.roles)} {(job.openRoles?.length ?? job.roles) === 1 ? "ruolo" : "ruoli"}
            </span>
          </div>
          <div className="space-y-2.5">
            {(job.openRoles ?? defaultRoles(job)).map((r) => (
              <Link
                key={r.id}
                to="/apply/$id"
                params={{ id: job.id }}
                className="group block rounded-2xl border border-ink/8 bg-card p-4 transition hover:border-ink/20 active:scale-[0.99]"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <UserSquare2 className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <p className="font-display text-[16px] font-semibold tracking-tight">{r.name}</p>
                      <span className="text-[11px] uppercase tracking-[0.16em] text-ink/45">
                        {r.type}
                      </span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink/65">
                      {r.ageRange && (
                        <span className="inline-flex items-center gap-1">
                          <Users className="size-3.5" />{r.ageRange}{r.gender ? ` · ${r.gender}` : ""}
                        </span>
                      )}
                      {r.fee && (
                        <span className="inline-flex items-center gap-1">
                          <Wallet className="size-3.5" />{r.fee}
                        </span>
                      )}
                      {r.shootDates && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="size-3.5" />{r.shootDates}
                        </span>
                      )}
                    </div>
                    {r.notes && (
                      <p className="mt-2 line-clamp-2 text-[12.5px] leading-relaxed text-ink/65">
                        {r.notes}
                      </p>
                    )}
                    {r.spots && r.spots > 1 && (
                      <span className="mt-2 inline-block rounded-full bg-ink/8 px-2 py-0.5 text-[10.5px] text-ink/65">
                        {r.spots} posti disponibili
                      </span>
                    )}
                  </div>
                  <ChevronRight className="mt-1 size-4 shrink-0 text-ink/35 transition group-hover:translate-x-0.5 group-hover:text-ink/60" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="border-b border-ink/[0.06] py-5">
          <h3 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-ink/45">Come candidarsi</h3>
          <ol className="space-y-3">
            {(job.applySteps ?? defaultSteps).map((s, i) => (
              <li key={s.title} className="flex gap-3">
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ink text-[12px] font-semibold text-paper">
                  {i + 1}
                </span>
                <div>
                  <p className="text-[14px] font-medium text-ink">{s.title}</p>
                  <p className="mt-0.5 text-[12.5px] leading-relaxed text-ink/60">
                    {s.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[11.5px] text-ink/50">
            Scadenza candidature: <span className="font-medium text-ink/75">{job.deadline}</span>
          </p>
        </section>

        <Section title="Compenso">
          <p className="font-display text-[22px] font-semibold tracking-tight">{job.budget}</p>
          <p className="mt-1 text-[12px] text-ink/55">Viaggio e alloggio da concordare in fase di candidatura.</p>
        </Section>

        <Section title="Requisiti">
          <ul className="space-y-1.5 text-[14px] text-ink/75">
            {job.requirements.map((r: string) => (
              <li key={r} className="flex gap-2"><span className="text-primary">✦</span>{r}</li>
            ))}
          </ul>
        </Section>

        <Section title="Riferimenti">
          <div className="flex flex-wrap gap-2">
            {job.references.map((r: string) => <Chip key={r} tone="outline">{r}</Chip>)}
          </div>
        </Section>

        <Section title="Moodboard">
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl"
                style={{
                  background: `linear-gradient(${30 + i * 40}deg, oklch(0.7 0.12 ${i * 50}), oklch(0.25 0.05 ${i * 70}))`,
                }}
              />
            ))}
          </div>
        </Section>

        <Section title="Team">
          <div className="flex items-center gap-3">
            <div className="size-12 rounded-full bg-lavender" />
            <div>
              <p className="text-[14px] font-medium">Sofia Marchetti</p>
              <p className="text-[12px] text-ink/55">Casting Director · {job.company}</p>
            </div>
          </div>
        </Section>
      </motion.div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-6 pb-8 pt-4">
        <Link
          to="/apply/$id"
          params={{ id: job.id }}
          className="flex w-full items-center justify-center cta rounded-2xl bg-primary py-4 text-[15px] text-primary-foreground shadow-float active:scale-[0.99]"
        >
          Candidati ora
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-ink/[0.06] py-5">
      <h3 className="mb-3 text-[11px] uppercase tracking-[0.2em] text-ink/45">{title}</h3>
      {children}
    </section>
  );
}

const defaultSteps = [
  { title: "Compila la candidatura", description: "Profilo, materiali e una breve nota motivazionale." },
  { title: "Revisione del casting", description: "Riceverai una risposta entro 7 giorni lavorativi." },
  { title: "Colloquio o self-tape", description: "I selezionati passano alla fase successiva." },
];

function defaultRoles(job: Job): OpenRole[] {
  const labels = ["Protagonista", "Supporto", "Cameo", "Comparsa", "Troupe", "Voce"];
  return Array.from({ length: Math.max(1, job.roles) }).map((_, i) => ({
    id: `role-${i}`,
    name: `Ruolo ${i + 1}`,
    type: labels[i % labels.length],
    fee: job.budget,
    shootDates: `Entro ${job.deadline}`,
    notes: job.description,
  }));
}
