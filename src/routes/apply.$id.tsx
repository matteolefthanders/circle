import { createFileRoute, useNavigate, notFound, Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Camera, Link as LinkIcon, Video, Check } from "lucide-react";
import { JOBS } from "@/lib/mock-data";
import { useLocal } from "@/lib/use-local";

export const Route = createFileRoute("/apply/$id")({
  head: () => ({ meta: [{ title: "Candidatura — CIRCLE" }] }),
  loader: ({ params }) => {
    const job = JOBS.find((j) => j.id === params.id);
    if (!job) throw notFound();
    return { job };
  },
  notFoundComponent: () => (
    <div className="p-8 text-center"><Link to="/jobs">← Indietro</Link></div>
  ),
  errorComponent: ({ error }) => <div className="p-8 text-center">{error.message}</div>,
  component: Apply,
});

const STEPS = [
  { key: "photos", label: "Foto / video", icon: Camera, hint: "Headshot, look book o reel breve." },
  { key: "intro", label: "Presentazione", icon: Video, hint: "Poche frasi sul perché di questo progetto." },
  { key: "links", label: "Link social", icon: LinkIcon, hint: "Instagram, IMDb, portfolio." },
  { key: "tape", label: "Self tape", icon: Video, hint: "Opzionale ma triplica le possibilità di callback." },
];

function Apply() {
  const { job } = Route.useLoaderData();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [intro, setIntro] = useState("");
  const [links, setLinks] = useState("");
  const [done, setDone] = useState(false);
  const [, setApplied] = useLocal<string[]>("circle:applied", []);

  const next = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else submit();
  };
  const submit = () => {
    setApplied((p) => (p.includes(job.id) ? p : [...p, job.id]));
    setDone(true);
    setTimeout(() => navigate({ to: "/applications" }), 2200);
  };

  if (done) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6 text-center text-ink">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
          className="mb-6 flex size-20 items-center justify-center rounded-full bg-ink text-paper shadow-glow"
        >
          <Check className="size-8" strokeWidth={2.4} />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="font-display text-[34px] font-semibold tracking-tight"
        >
          Sei nel Circle.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-2 max-w-[280px] text-[14px] text-ink/60"
        >
          {job.company} ti contatterà se il tuo profilo è in linea.
        </motion.p>
      </div>
    );
  }

  const S = STEPS[step];

  return (
    <div className="min-h-screen bg-background pb-32 text-ink">
      <header className="flex items-center justify-between px-5 pt-12">
        <button
          onClick={() => (step === 0 ? navigate({ to: "/jobs/$id", params: { id: job.id } }) : setStep(step - 1))}
          className="flex size-10 items-center justify-center rounded-full bg-card shadow-soft"
          aria-label="Indietro"
        >
          <ArrowLeft className="size-4" />
        </button>
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/45">
          Step {step + 1} di {STEPS.length}
        </p>
        <div className="size-10" />
      </header>

      <div className="px-5 pt-2">
        <div className="flex gap-1">
          {STEPS.map((_, i) => (
            <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-ink/10">
              <motion.div
                initial={false}
                animate={{ width: i <= step ? "100%" : "0%" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-primary"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="px-6 pt-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={S.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <S.icon className="size-7 text-primary" strokeWidth={1.8} />
            <h1 className="mt-4 font-display text-[28px] font-semibold leading-tight tracking-tight">
              {S.label}
            </h1>
            <p className="mt-2 text-[14px] text-ink/55">{S.hint}</p>

            {(S.key === "photos" || S.key === "tape") && (
              <button className="mt-8 flex h-44 w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed border-ink/15 bg-card text-ink/55 transition active:scale-[0.99]">
                <Camera className="size-6" />
                <span className="text-[13px] font-medium">Tocca per caricare</span>
                <span className="text-[11px] text-ink/40">MP4 · MOV · JPG fino a 200MB</span>
              </button>
            )}

            {S.key === "intro" && (
              <textarea
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
                placeholder="Sono interessat@ a questo progetto perché…"
                className="mt-8 h-44 w-full resize-none rounded-3xl border border-ink/10 bg-card p-4 text-[14px] leading-relaxed outline-none placeholder:text-ink/35 focus:border-primary/40 focus:shadow-glow"
              />
            )}

            {S.key === "links" && (
              <div className="mt-8 space-y-3">
                {["Instagram", "IMDb", "Portfolio / sito"].map((label) => (
                  <input
                    key={label}
                    placeholder={label}
                    onChange={(e) => setLinks(`${links} ${e.target.value}`)}
                    className="w-full rounded-2xl border border-ink/10 bg-card px-4 py-3.5 text-[14px] outline-none placeholder:text-ink/35 focus:border-primary/40"
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md px-6 pb-8 pt-4">
        <button
          onClick={next}
          className="w-full cta rounded-2xl bg-primary py-4 text-[15px] text-primary-foreground shadow-float active:scale-[0.99]"
        >
          {step === STEPS.length - 1 ? "Invia candidatura" : "Continua"}
        </button>
      </div>
    </div>
  );
}
