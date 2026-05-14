import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bookmark, Share2, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Job } from "@/lib/mock-data";
import { Chip } from "./Chip";
import { ShareSheet } from "./ShareSheet";

export function JobCard({
  job,
  saved,
  onToggleSave,
  index = 0,
}: {
  job: Job;
  saved: boolean;
  onToggleSave: () => void;
  index?: number;
}) {
  const [shareOpen, setShareOpen] = useState(false);
  const handleSave = () => {
    onToggleSave();
    toast.success(saved ? "Rimosso dai salvati" : "Salvato", {
      description: job.title,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.985 }}
      className="group relative overflow-hidden rounded-3xl glass-card shadow-float"
    >
      <Link to="/jobs/$id" params={{ id: job.id }} className="block">
        <div
          className="relative h-36 w-full"
          style={{ background: job.cover }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15)_0%,transparent_30%,rgba(0,0,0,0.85)_100%)]" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
            {job.featured && (
              <span className="inline-flex items-center rounded-full bg-ember px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-ember">
                In evidenza
              </span>
            )}
            {job.remote && (
              <span className="inline-flex items-center rounded-full border border-white/30 bg-black/35 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white backdrop-blur-md">
                Remoto
              </span>
            )}
          </div>
          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-3 text-paper">
            <div className="min-w-0">
              <p className="truncate text-[11px] uppercase tracking-[0.18em] opacity-80">
                {job.company}
              </p>
              <h3 className="truncate text-lg font-semibold tracking-tight">{job.title}</h3>
            </div>
          </div>
        </div>
      </Link>
      <div className="space-y-3 p-4">
        <p className="line-clamp-2 text-[13px] leading-relaxed text-foreground/65">
          {job.description}
        </p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[12px] text-foreground/55">
          <span className="inline-flex items-center gap-1"><MapPin className="size-3.5" />{job.location}</span>
          <span className="inline-flex items-center gap-1"><Calendar className="size-3.5" />{job.deadline}</span>
          <span className="inline-flex items-center gap-1"><Users className="size-3.5" />{job.roles} ruoli</span>
        </div>
        <div className="flex items-center justify-between border-t border-foreground/10 pt-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-foreground/40">Budget</p>
            <p className="text-sm font-semibold tracking-tight text-foreground">{job.budget}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => { e.preventDefault(); handleSave(); }}
              className="rounded-full p-2 transition hover:bg-foreground/5 active:scale-95"
              aria-label="Salva"
            >
              <Bookmark
                className={`size-4 transition ${saved ? "fill-primary text-primary" : "text-foreground/55"}`}
              />
            </button>
            <button
              onClick={(e) => { e.preventDefault(); setShareOpen(true); }}
              className="rounded-full p-2 transition hover:bg-foreground/5 active:scale-95"
              aria-label="Condividi"
            >
              <Share2 className="size-4 text-foreground/55" />
            </button>
          </div>
        </div>
      </div>
      <ShareSheet
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        title={job.title}
        subtitle={job.company}
        url={typeof window !== "undefined" ? `${window.location.origin}/jobs/${job.id}` : undefined}
      />
    </motion.div>
  );
}
