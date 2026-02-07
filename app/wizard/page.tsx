"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "../../lib/questions";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { useAppStore } from "../store";
import { ManualInput } from "../../lib/types";
import { ensureManualInput } from "../../lib/validation";

export default function WizardPage() {
  const router = useRouter();
  const { state, setManualInput } = useAppStore();
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const totalSteps = questions.length;

  const currentQuestion = questions[step];
  const manualInput = state.manualInput;

  const selectedValue = useMemo(() => {
    if (!manualInput) return "unknown";
    return manualInput[currentQuestion.id] ?? "unknown";
  }, [manualInput, currentQuestion.id]);

  if (!manualInput) {
    router.push("/");
    return null;
  }

  const handleSelect = (value: string) => {
    setError(null);
    setManualInput({
      ...manualInput,
      [currentQuestion.id]: value
    } as ManualInput);
  };

  const handleNext = () => {
    if (!manualInput[currentQuestion.id]) {
      setManualInput({
        ...manualInput,
        [currentQuestion.id]: "unknown"
      } as ManualInput);
    }

    if (step < totalSteps - 1) {
      setStep(step + 1);
    } else {
      try {
        ensureManualInput(manualInput);
        router.push("/results");
      } catch (err) {
        console.error(err);
        setError("Noe mangler i skjemaet. Gå tilbake og sjekk svarene.");
      }
    }
  };

  const handleBack = () => {
    if (step === 0) {
      router.push("/purpose");
    } else {
      setStep(step - 1);
    }
  };

  return (
    <main className="main-container space-y-6">
      <header className="space-y-2">
        <p className="text-xs text-slate-500">Steg 2 av 3</p>
        <h1 className="text-2xl font-semibold">Kort spørsmål av gangen</h1>
        <p className="text-sm text-slate-600">
          Velg det som passer best. Du kan alltid velge “Vet ikke”.
        </p>
      </header>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            Spørsmål {step + 1} av {totalSteps}
          </span>
          <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
        </div>
        <Progress value={((step + 1) / totalSteps) * 100} />
      </div>

      <Card className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">{currentQuestion.title}</h2>
          <p className="text-sm text-slate-600">{currentQuestion.description}</p>
        </div>
        <div className="grid gap-2">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                selectedValue === option.value
                  ? "border-brand-600 bg-brand-50"
                  : "border-slate-200 bg-white hover:border-brand-400"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </Card>

      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack}>
          Tilbake
        </Button>
        <Button onClick={handleNext}>{step === totalSteps - 1 ? "Se resultat" : "Neste"}</Button>
      </div>
    </main>
  );
}
