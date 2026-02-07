"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { manualProvider } from "../lib/data-provider";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { useAppStore } from "./store";

export default function HomePage() {
  const router = useRouter();
  const { state, setSelectedCompanyId } = useAppStore();
  const [query, setQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  const companies = manualProvider.listCompanies();
  const filteredCompanies = useMemo(() => {
    if (!query.trim()) return companies;
    const lower = query.toLowerCase();
    return companies.filter(
      (company) =>
        company.name.toLowerCase().includes(lower) ||
        (company.orgNumber ?? "").includes(lower)
    );
  }, [companies, query]);

  const handleContinue = () => {
    if (!state.selectedCompanyId) {
      setError("Velg et selskap for å fortsette.");
      return;
    }
    router.push("/purpose");
  };

  const handleSelectDemo = (id: string) => {
    const demo = manualProvider.getManualInputForCompany(id);
    if (!demo) return;
    setSelectedCompanyId(id);
    setError(null);
  };

  return (
    <main className="main-container space-y-6">
      <header className="space-y-3">
        <Badge>SelskapsSjekk</Badge>
        <h1 className="text-3xl font-semibold">Sjekk tryggheten i et selskap</h1>
        <p className="text-sm text-slate-600">
          Vi bruker offentlige og kjente signaler for å gi en forklarbar vurdering – uten
          at du må svare på spørsmål.
        </p>
      </header>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Velg selskap (demo)</h2>
          <span className="text-xs text-slate-500">MVP uten integrasjoner</span>
        </div>
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Søk i demo-data"
        />
        <div className="grid gap-3">
          {filteredCompanies.map((company) => (
            <button
              key={company.id}
              type="button"
              onClick={() => handleSelectDemo(company.id)}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-brand-600"
            >
              <p className="font-semibold">{company.name}</p>
              <p className="text-xs text-slate-500">Org.nr: {company.orgNumber}</p>
            </button>
          ))}
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleContinue}
          type="button"
          disabled={!state.selectedCompanyId}
        >
          Fortsett
        </Button>
      </section>
    </main>
  );
}
