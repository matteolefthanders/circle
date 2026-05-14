export function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "primary" | "dark" | "outline";
}) {
  const styles: Record<string, string> = {
    default: "glass-pill text-foreground/85",
    primary: "bg-ember text-white shadow-ember",
    dark: "bg-paper/80 text-foreground border border-white/10",
    outline: "border border-white/15 text-foreground/75",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
