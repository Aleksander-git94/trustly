"use client";

import { useRouter } from "next/navigation";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { useAppStore } from "../store";
import { Purpose } from "../../lib/types";
import { manualProvider } from "../../lib/data-provider";

const purposes: { id: Purpose; title: string; description: string }[] = [
  {
    id: "invest",
    title: "Investere",
    description: "Forstå risiko før du investerer."
  },
  {
    id: "apply_job",
    title: "Søke jobb",
    description: "Vurder trygghet før du takker ja."
  },
  {
    id: "employee",
    title: "Allerede ansatt",
    description: "Få et bedre bilde av situasjonen."
  }
];

export default function PurposePage() {
  const router = useRouter();
  const { state, setManualInput } = useAppStore();

  const handleSelect = (purpose: Purpose) => {
    if (state.manualInput) {
      setManualInput({ ...state.manualInput, purpose });
      router.push("/results");
      return;
    }
    if (!state.selectedCompanyId) {
      router.push("/");
      return;
    }
    const demo = manualProvider.getManualInputForCompany(state.selectedCompanyId);
    if (!demo) {
      router.push("/");
      return;
    }
    setManualInput({ ...demo, purpose });
    router.push("/results");
  };

  return (
    <main className="main-container space-y-6">
      <header className="space-y-2">
        <p className="text-xs text-slate-500">Steg 2 av 2</p>
        <h1 className="text-2xl font-semibold">Hva er formålet ditt?</h1>
        <p className="text-sm text-slate-600">
          Vi vurderer samme selskapsdata, men forklarer resultatet ulikt basert på
          situasjonen din.
        </p>
      </header>

      <div className="space-y-3">
        {purposes.map((purpose) => (
          <Card
            key={purpose.id}
            className="cursor-pointer border-slate-200 hover:border-brand-600"
            onClick={() => handleSelect(purpose.id)}
          >
            <h2 className="text-lg font-semibold">{purpose.title}</h2>
            <p className="text-sm text-slate-600">{purpose.description}</p>
          </Card>
        ))}
      </div>

      <Button variant="ghost" onClick={() => router.push("/")}>Tilbake</Button>
    </main>
  );
}
