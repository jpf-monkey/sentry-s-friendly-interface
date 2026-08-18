import { cn } from "@/lib/utils";

type Props = {
  env: "SBX" | "PRD";
  onEnv: (env: "SBX" | "PRD") => void;
  caseId: string;
};

export function SentryTopBar({ env, onEnv, caseId }: Props) {
  return (
    <header className="z-10 border-b border-black/5 bg-white">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <div className="flex rounded-lg bg-canvas p-0.5 ring-1 ring-black/5">
            {(["SBX", "PRD"] as const).map((option) => (
              <button
                key={option}
                onClick={() => onEnv(option)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-semibold transition-colors",
                  option === env
                    ? "bg-white text-navy shadow-sm ring-1 ring-black/5"
                    : "text-navy/50 hover:text-navy",
                )}
              >
                {option}
              </button>
            ))}
          </div>
          <span className="h-4 w-px bg-black/10" />
          <span className="text-sm text-navy/60">
            Investigación activa: <strong className="text-navy">{caseId}</strong>
          </span>
        </div>
      </div>
      {env === "PRD" ? (
        <div className="bg-warning/10 px-6 py-1.5 text-center ring-1 ring-warning/20">
          <p className="text-[11px] font-medium tracking-wide text-warning">
            Modo producción: las consultas acceden a datos reales. Verifica antes de ejecutar
            acciones.
          </p>
        </div>
      ) : (
        <div className="bg-canvas px-6 py-1.5 text-center ring-1 ring-black/5">
          <p className="text-[11px] font-medium tracking-wide text-navy/50">
            Sandbox: puedes consultar y probar libremente, no hay impacto tributario.
          </p>
        </div>
      )}
    </header>
  );
}