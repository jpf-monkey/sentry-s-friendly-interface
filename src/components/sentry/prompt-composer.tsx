import { useState } from "react";

type Props = {
  country: string;
  onSubmit: (question: string) => void;
  suggestions: string[];
};

export function PromptComposer({ country, onSubmit, suggestions }: Props) {
  const [value, setValue] = useState("");

  function submit() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className="mx-auto max-w-4xl px-8 pb-8">
      <div className="mb-3 flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => setValue(suggestion)}
            className="rounded-full border border-black/5 bg-white/80 px-3 py-1 text-xs text-navy/60 backdrop-blur transition-colors hover:border-teal/40 hover:text-navy"
          >
            {suggestion}
          </button>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className="rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black/10 focus-within:ring-teal/50"
      >
        <div className="flex items-center gap-3">
          <div className="flex shrink-0 items-center border-r border-black/5 px-3">
            <span className="text-xs font-semibold uppercase tracking-tight text-teal">
              {country}
            </span>
          </div>
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Escribe tu consulta sobre xPOS…"
            aria-label="Consulta para Sentry"
            className="flex-1 bg-transparent px-2 py-3 text-sm text-navy placeholder:text-navy/40 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95"
          >
            Preguntar
          </button>
        </div>
      </form>
    </div>
  );
}