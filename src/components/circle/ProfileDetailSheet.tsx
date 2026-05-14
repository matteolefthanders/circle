import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Briefcase, Award, X } from "lucide-react";
import type { CircleProfile } from "@/lib/mock-data";

type Props = {
  profile: CircleProfile | null;
  onClose: () => void;
};

export function ProfileDetailSheet({ profile, onClose }: Props) {
  return (
    <AnimatePresence>
      {profile && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/55 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 32 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[88vh] w-full max-w-md flex-col rounded-t-3xl bg-card shadow-lift pb-[max(env(safe-area-inset-bottom),16px)]"
          >
            <div className="flex items-center justify-between px-5 pt-3">
              <span className="mx-auto h-1.5 w-12 rounded-full bg-foreground/15" />
            </div>
            <div className="overflow-y-auto">
            <div className="flex items-center gap-3 px-5 pt-3">
              <img
                src={profile.photo}
                alt={profile.name}
                className="size-16 rounded-2xl object-cover"
              />
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-[19px] font-semibold tracking-tight">
                  {profile.name}, <span className="text-ink/55">{profile.age}</span>
                </h3>
                <p className="text-[12.5px] text-ink/65">{profile.roleLabel}</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Chiudi"
                className="flex size-8 items-center justify-center rounded-full bg-ink/8 text-ink/65"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 px-5">
              <Stat icon={<MapPin className="size-3.5" />} label="Base" value={profile.city} />
              <Stat icon={<Briefcase className="size-3.5" />} label="Esperienza" value={profile.experience} />
              <Stat icon={<Award className="size-3.5" />} label="Skills" value={`${profile.skills.length}`} />
            </div>

            <div className="mt-5 px-5">
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-ink/45">Bio</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink/80">
                {profile.bio}
              </p>
            </div>

            <div className="mt-5 px-5">
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-ink/45">Skill</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {profile.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-ink/8 px-2.5 py-1 text-[11.5px] text-ink/75"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 px-5 pb-5">
              <p className="text-[10.5px] uppercase tracking-[0.2em] text-ink/55">Ultimo lavoro</p>
              <p className="mt-1 text-[13.5px] font-medium text-ink">{profile.lastWork}</p>
            </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-paper/60 px-3 py-2.5">
      <div className="flex items-center gap-1 text-ink/55">
        {icon}
        <p className="text-[10px] uppercase tracking-[0.16em]">{label}</p>
      </div>
      <p className="mt-0.5 truncate text-[12.5px] font-semibold tracking-tight text-ink">
        {value}
      </p>
    </div>
  );
}
