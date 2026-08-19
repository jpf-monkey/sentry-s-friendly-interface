import type { Investigation } from "@/lib/sentry-data";
import { countries } from "@/lib/sentry-data";
import { cn } from "@/lib/utils";

type Props = {
  investigations: Investigation[];
  activeId: string;
  onSelect: (id: string) => void;
  selected: string[];
  onToggleCountry: (country: string) => void;
  onSelectAll: () => void;
};

const dot: Record<string, string> = {
  ok: "bg-teal",
  error: "bg-error",
  unknown: "bg-warning",
};

export function SentrySidebar({
  investigations,
  activeId,
  onSelect,
  selected,
  onToggleCountry,
  onSelectAll,
}: Props) {
  const allSelected = selected.length === countries.length;

  return (
    <aside className="flex w-72 shrink-0 flex-col bg-navy text-white/70">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-lg bg-teal font-display text-sm font-bold text-navy">
            S
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            Sentry
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4">
        <div className="pb-6">
          <div className="flex items-center justify-between px-2">
            <p className="text-[10px] font-medium uppercase tracking-widest text-white/40">
              Países
            </p>
            <span className="text-[10px] font-medium text-white/40">
              {allSelected ? "Todos" : `${selected.length}/${countries.length}`}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5 px-2">
            <button
              onClick={onSelectAll}
              aria-pressed={allSelected}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
                allSelected
                  ? "bg-teal text-white"
                  : "bg-white/5 text-white/60 hover:bg-white/10",
              )}
            >
              Todos
            </button>
            {countries.map((country) => (
              <button
                key={country}
                onClick={() => onToggleCountry(country)}
                aria-pressed={selected.includes(country)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
                  selected.includes(country)
                    ? "bg-white/15 text-teal-bright ring-1 ring-teal-bright/40"
                    : "bg-white/5 text-white/60 hover:bg-white/10",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    selected.includes(country) ? "bg-teal-bright" : "bg-white/20",
                  )}
                />
                {country}
              </button>
            ))}
          </div>
        </div>

        <p className="px-2 text-[10px] font-medium uppercase tracking-widest text-white/40">
          Recientes
        </p>
        <div className="mt-2 space-y-0.5">
          {investigations.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect(item.id)}
              className={cn(
                "flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors",
                item.id === activeId ? "bg-white/10 text-white" : "hover:bg-white/5",
              )}
            >
              <span className={cn("mt-1.5 size-1.5 shrink-0 rounded-full", dot[item.status])} />
              <span className="min-w-0">
                <span className="block truncate">{item.title}</span>
                <span className="mt-0.5 block text-[11px] text-white/40">{item.when}</span>
              </span>
            </button>
          ))}
        </div>
      </nav>

      <div className="mt-auto border-t border-white/10 p-4">
        <div className="flex items-center gap-3 px-2 py-2">
          <span className="grid size-8 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">
            SA
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">Superadministrador</p>
            <p className="truncate text-xs text-white/40">soporte@xpos.io</p>
          </div>
        </div>
      </div>
    </aside>
  );
}