import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/circle/Logo";
import { CheckCircle2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/welcome")({
  head: () => ({ meta: [{ title: "Benvenuto — CIRCLE" }] }),
  component: Welcome,
});

const MOCK_PROFILE = {
  name: "Guido Gargiullo",
  headline: "Attore · Roma",
};

function Welcome() {
  const navigate = useNavigate();
  const onLogin = () => navigate({ to: "/role" });

  return (
    <div className="relative flex min-h-screen flex-col bg-login px-6 pb-10 pt-12 text-ink">
      <Logo />

      <div className="mt-12 flex-1">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-balance font-display text-[32px] font-semibold leading-[1.05] tracking-tight"
        >
          Solo artisti verificati.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 max-w-[330px] text-[15px] leading-relaxed text-ink/60"
        >
          Accedi con il tuo profilo IMDb. Importeremo automaticamente CV, credits e foto — nessun form da compilare.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center gap-2.5 rounded-2xl border border-ink/10 bg-card px-4 py-3 shadow-soft"
        >
          <CheckCircle2 className="size-4 shrink-0 text-primary" />
          <p className="text-[13px] leading-snug text-ink/75">
            Verrai loggato come{" "}
            <span className="font-semibold text-ink">{MOCK_PROFILE.name}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-3 flex items-start gap-2 rounded-xl bg-ink/[0.04] p-3 text-[12px] leading-relaxed text-ink/65"
        >
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>
            Verifichiamo il tuo profilo tramite IMDb così nessuno può fingersi un altro artista. Non condividiamo i tuoi dati.
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-3"
      >
        <button
          onClick={onLogin}
          className="flex w-full items-center justify-center gap-2.5 cta rounded-2xl bg-primary py-4 text-[15px] text-primary-foreground shadow-float active:scale-[0.99]"
        >
          <ImdbMark /> Accedi con IMDb
        </button>
        <p className="pt-1 text-center text-[11px] leading-relaxed text-ink/45">
          Solo artisti con un profilo IMDb pubblico possono iscriversi. Continuando accetti i nostri{" "}
          <Link to="/welcome" className="underline underline-offset-2">Termini</Link> e la{" "}
          <Link to="/welcome" className="underline underline-offset-2">Privacy</Link>.
        </p>
      </motion.div>
    </div>
  );
}

function ImdbMark() {
  return (
    <span className="flex h-[20px] items-center justify-center rounded-[4px] bg-[#F5C518] px-1.5 text-[11px] font-extrabold tracking-tight text-black">
      IMDb
    </span>
  );
}
