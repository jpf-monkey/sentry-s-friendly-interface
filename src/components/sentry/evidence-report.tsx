import type { Report, TrayStatus } from "@/lib/sentry-data";
import { cn } from "@/lib/utils";

const trayText: Record<TrayStatus, string> = {
  ok: "text-teal",
  error: "text-error",
  unknown: "text-warning",
};

const trayBar: Record<TrayStatus, string> = {
  ok: "bg-teal",
  error: "bg-error",
  unknown: "bg-warning",
};

const stateText: Record<string, string> = {
  Success: "text-teal",
  Failed: "text-error",
  Reintento: "text-warning",
};

export function EvidenceReport({ report }: { report: Report }) {
  return (
    <article className="animate-in fade-in slide-in-from-bottom-3 rounded-xl bg-white p-8 ring-1 ring-black/5 duration-500">
      <div className="mb-8 flex items-start justify-between gap-6">
        <div className="max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-navy">
            {report.verdict}
          </h2>
          <p className="mt-3 max-w-[56ch] text-pretty text-base leading-relaxed text-navy/70">
            {report.summary}
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className="rounded-md bg-error/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-error ring-1 ring-error/20">
            {report.badge}
          </span>
          <span className="font-mono text-[11px] text-navy/40">{report.id}</span>
        </div>
      </div>

      <div className="mb-10 grid gap-4 md:grid-cols-3">
        {report.trays.map((tray) => (
          <div key={tray.label} className="flex flex-col rounded-lg bg-canvas p-4 ring-1 ring-black/5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-navy/40">
              {tray.label}
            </span>
            <span className={cn("mt-2 text-sm font-medium", trayText[tray.status])}>
              {tray.value}
            </span>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
              <div className={cn("h-full", tray.fill, trayBar[tray.status])} />
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-lg border border-black/5">
        <table className="w-full text-left text-sm">
          <thead className="bg-canvas text-[11px] font-bold uppercase tracking-widest text-navy/40">
            <tr>
              <th className="px-4 py-3">Hora (UTC)</th>
              <th className="px-4 py-3">Evento</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Código</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {report.trace.map((row, index) => (
              <tr key={`${row.time}-${index}`} className="transition-colors hover:bg-canvas/70">
                <td className="px-4 py-3 font-mono text-xs text-navy/40">{row.time}</td>
                <td className="px-4 py-3 font-medium text-navy">{row.event}</td>
                <td className={cn("px-4 py-3 font-medium", stateText[row.state])}>{row.state}</td>
                <td className="px-4 py-3 font-mono text-xs text-navy/70">{row.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium text-navy/40">Fuentes consultadas:</span>
        <div className="flex flex-wrap gap-2">
          {report.sources.map((source) => (
            <span
              key={source}
              className="inline-flex items-center gap-1.5 rounded-md border border-black/5 bg-canvas px-2 py-1 font-mono text-xs text-navy/60"
            >
              <span className="size-1.5 rounded-full bg-teal" />
              {source}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}