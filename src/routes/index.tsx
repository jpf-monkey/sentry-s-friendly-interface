import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { EvidenceReport } from "@/components/sentry/evidence-report";
import { PromptComposer } from "@/components/sentry/prompt-composer";
import { SentrySidebar } from "@/components/sentry/sentry-sidebar";
import { SentryTopBar } from "@/components/sentry/sentry-topbar";
import { investigations as seed, type Investigation } from "@/lib/sentry-data";

const DESCRIPTION =
  "Consola de investigación de Sentry: pregunta en lenguaje natural y recibe evidencia trazable de rechazos DTE en LATAM.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sentry · Consola de investigación de rechazos DTE" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Sentry · Consola de investigación de rechazos DTE" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

const suggestions = [
  "¿Por qué se rechazó el lote de hoy?",
  "Comparar con un documento sano del mismo emisor",
  "¿Hubo reintentos automáticos?",
];

function Index() {
  const first = seed[0] as Investigation;
  const [items, setItems] = useState<Investigation[]>(seed);
  const [activeId, setActiveId] = useState(first.id);
  const [selected, setSelected] = useState<string[]>([first.country]);
  const [env, setEnv] = useState<"SBX" | "PRD">("PRD");

  const scope =
    selected.length === 0
      ? "Sin países"
      : selected.length === allCountries.length
        ? "Todos los países"
        : selected.length <= 2
          ? selected.join(" · ")
          : `${selected.length} países`;

  function toggleCountry(country: string) {
    setSelected((prev) =>
      prev.includes(country) ? prev.filter((item) => item !== country) : [...prev, country],
    );
  }

  function selectAll() {
    setSelected((prev) => (prev.length === allCountries.length ? [] : [...allCountries]));
  }

  const active = useMemo<Investigation>(
    () => items.find((item) => item.id === activeId) ?? (items[0] as Investigation),
    [items, activeId],
  );

  function handleSubmit(question: string) {
    const id = `NEW-${items.length + 1}`;
    setItems((prev) => [
      {
        ...(prev[0] as Investigation),
        id,
        title: question.slice(0, 42),
        question,
        country: scope,
        when: `Ahora · ${env}`,
      },
      ...prev,
    ]);
    setActiveId(id);
  }

  return (
    <div className="flex h-screen bg-canvas font-sans text-navy">
      <SentrySidebar
        investigations={items}
        activeId={active.id}
        onSelect={setActiveId}
        selected={selected}
        onToggleCountry={toggleCountry}
        onSelectAll={selectAll}
      />

      <main className="relative flex flex-1 flex-col overflow-hidden">
        <SentryTopBar env={env} onEnv={setEnv} caseId={active.id} />

        <div className="flex-1 overflow-y-auto pb-48">
          <section className="mx-auto max-w-4xl space-y-6 px-8 py-10">
            <div className="flex justify-end">
              <p className="max-w-xl rounded-xl bg-navy px-4 py-3 text-sm leading-relaxed text-white">
                {active.question}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-widest text-navy/40">
              <span className="size-1.5 rounded-full bg-teal" />
              Evidencia · {active.country} · {env}
            </div>
            <EvidenceReport report={active.report} />
          </section>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <div className="h-10 bg-gradient-to-t from-canvas to-transparent" />
          <div className="bg-canvas">
          <PromptComposer scope={scope} onSubmit={handleSubmit} suggestions={suggestions} />
          </div>
        </div>
      </main>
    </div>
  );
}
