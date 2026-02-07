"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createReport } from "../../lib/risk-engine";
import { RiskCard } from "../../lib/types";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Toggle } from "../components/ui/toggle";
import { ScoreRing } from "../components/ui/score-ring";
import { useAppStore } from "../store";

const levelColor: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-700",
  yellow: "bg-amber-100 text-amber-700",
  red: "bg-rose-100 text-rose-700"
};

const simplifyText = (text: string) => {
  const parts = text.split(".");
  return parts[0] ? `${parts[0]}.` : text;
};

const simplifyList = (items: string[]) => {
  if (items.length === 0) return items;
  return [simplifyText(items[0])];
};

export default function ResultsPage() {
  const router = useRouter();
  const { state, reset } = useAppStore();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [simpleMode, setSimpleMode] = useState(false);
  const report = useMemo(() => {
    if (!state.manualInput) return null;
    return createReport(state.manualInput);
  }, [state.manualInput]);

  if (!report) {
    router.push("/");
    return null;
  }

  const handleCopyQuestions = async () => {
    const text = report.questionsToAsk.map((question) => `• ${question}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      alert("Spørsmål kopiert til utklippstavlen.");
    } catch (error) {
      console.error(error);
      alert("Kunne ikke kopiere. Prøv å markere og kopiere manuelt.");
    }
  };

  return (
    <main className="main-container space-y-6">
      <header className="space-y-2">
        <Badge>Steg 2 av 2</Badge>
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-lg font-semibold text-brand-700">
            {report.companyName
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join("")}
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Resultat for {report.companyName}</h1>
            <p className="text-xs text-slate-500">Basert på åpne selskapsdata</p>
          </div>
        </div>
        <p className="text-sm text-slate-600">
          Totalvurdering: {report.overallScore}/100 ({report.overallLevel})
        </p>
      </header>

      <div className="flex items-center justify-between">
        <Toggle
          pressed={simpleMode}
          onPressedChange={setSimpleMode}
          label="Forklar enkelt"
        />
        <Button variant="ghost" onClick={() => router.push("/purpose")}>
          Endre formål
        </Button>
      </div>

      <section className="grid gap-4">
        {report.cards.map((card) => (
          <Card key={card.id} className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>
                    {card.id === "economy" && "💰"}
                    {card.id === "job_security" && "🧑‍💼"}
                    {card.id === "governance" && "🧭"}
                    {card.id === "legal_ops" && "⚖️"}
                  </span>
                  <span>{card.score}/100</span>
                </div>
                <h2 className="text-lg font-semibold">{card.title}</h2>
              </div>
              <div className="flex items-center gap-2">
                <ScoreRing score={card.score} level={card.level} />
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    levelColor[card.level]
                  }`}
                >
                  {card.level.toUpperCase()}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              {simpleMode ? simplifyText(card.summary) : card.summary}
            </p>
            <button
              type="button"
              className="text-left text-sm font-semibold text-brand-600"
              onClick={() =>
                setExpanded((prev) => ({ ...prev, [card.id]: !prev[card.id] }))
              }
            >
              {expanded[card.id] ? "Skjul detaljer" : "Hvorfor?"}
            </button>
            {expanded[card.id] ? (
              <CardDetails card={card} simpleMode={simpleMode} />
            ) : null}
          </Card>
        ))}
      </section>

      <Card className="space-y-3">
        <h2 className="text-lg font-semibold">Røde flagg</h2>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {report.redFlags.map((flag) => (
            <li key={flag}>{simpleMode ? simplifyText(flag) : flag}</li>
          ))}
        </ul>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Spørsmål du bør stille</h2>
          <Button variant="secondary" onClick={handleCopyQuestions}>
            Kopier
          </Button>
        </div>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {report.questionsToAsk.map((question) => (
            <li key={question}>{simpleMode ? simplifyText(question) : question}</li>
          ))}
        </ul>
      </Card>

      <div className="flex flex-col gap-2">
        <Button onClick={() => router.push("/")}>Nytt søk</Button>
        <Button
          variant="ghost"
          onClick={() => {
            reset();
            router.push("/");
          }}
        >
          Nullstill alt
        </Button>
      </div>
    </main>
  );
}

function CardDetails({ card, simpleMode }: { card: RiskCard; simpleMode: boolean }) {
  const whatItMeans = simpleMode ? simplifyList(card.whatItMeans) : card.whatItMeans;
  const recommendedActions = simpleMode
    ? simplifyList(card.recommendedActions)
    : card.recommendedActions;

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase text-slate-400">Årsaker</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {card.reasons.map((reason) => (
            <li key={reason}>{simpleMode ? simplifyText(reason) : reason}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-slate-400">Hva betyr dette?</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {whatItMeans.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase text-slate-400">Anbefalte tiltak</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
          {recommendedActions.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
