import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { CircleProfile } from "@/lib/mock-data";

type Props = {
  profile: CircleProfile | null;
  meAvatar: string;
  convoId: string | null;
  onClose: () => void;
};

export function MatchModal({ profile, meAvatar, convoId, onClose }: Props) {
  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-6 backdrop-blur-md"
        >
          <button
            onClick={onClose}
            aria-label="Chiudi"
            className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full bg-paper/15 text-paper backdrop-blur"
          >
            <X className="size-4" />
          </button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="w-full max-w-sm text-center"
          >
            <p className="text-[11px] uppercase tracking-[0.32em] text-paper/55">
              Circle match
            </p>
            <h2 className="mt-2 font-display text-[40px] font-semibold leading-none tracking-tight text-paper">
              È un match!
            </h2>
            <p className="mt-2 text-[13px] text-paper/70">
              Tu e <span className="font-medium text-paper">{profile.name}</span> avete
              voglia di lavorare insieme.
            </p>

            <div className="relative mx-auto mt-7 flex h-32 items-center justify-center">
              <motion.img
                src={meAvatar}
                alt="Tu"
                initial={{ x: -120, opacity: 0, rotate: -10 }}
                animate={{ x: -28, opacity: 1, rotate: -6 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 18 }}
                className="absolute size-28 rounded-full border-[3px] border-paper object-cover shadow-float"
              />
              <motion.img
                src={profile.photo}
                alt={profile.name}
                initial={{ x: 120, opacity: 0, rotate: 10 }}
                animate={{ x: 28, opacity: 1, rotate: 6 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 180, damping: 18 }}
                className="absolute size-28 rounded-full border-[3px] border-primary object-cover shadow-float"
              />
            </div>

            <div className="mt-7 space-y-2">
              {convoId && (
                <Link
                  to="/messages/$id"
                  params={{ id: convoId }}
                  onClick={onClose}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-[14px] font-semibold text-primary-foreground shadow-float active:scale-[0.98]"
                >
                  <MessageCircle className="size-4" />
                  Scrivi ora a {profile.name.split(" ")[0]}
                </Link>
              )}
              <button
                onClick={onClose}
                className="w-full rounded-full bg-paper/12 px-5 py-3 text-[13px] font-medium text-paper backdrop-blur transition active:scale-[0.98]"
              >
                Continua a esplorare
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
