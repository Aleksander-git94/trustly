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
  const { state, setSelectedCompanyId, setManualInput } = useAppStore();
  const [query, setQuery] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [orgNumber, setOrgNumber] = useState("");
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
    if (!companyName.trim()) {
      setError("Skriv inn et selskapsnavn eller velg en demo.");
      return;
    }
    setSelectedCompanyId(null);
    setManualInput({
      companyName: companyName.trim(),
      orgNumber: orgNumber.trim() || undefined,
      purpose: "invest"
    });
    router.push("/purpose");
  };

  const handleSelectDemo = (id: string) => {
    const demo = manualProvider.getManualInputForCompany(id);
    if (!demo) return;
    setSelectedCompanyId(id);
    setManualInput(demo);
    setCompanyName(demo.companyName);
    setOrgNumber(demo.orgNumber ?? "");
    setError(null);
  };

  const handleDemoResult = () => {
    router.push("/results");
  };

  return (
    <main className="main-container space-y-6">
      <header className="space-y-3">
        <Badge>SelskapsSjekk</Badge>
        <h1 className="text-3xl font-semibold">Sjekk tryggheten i et selskap</h1>
        <p className="text-sm text-slate-600">
          Få en enkel og forklarbar risikovurdering for investering, jobbsøk eller som
          ansatt.
        </p>
      </header>

      <Card className="space-y-4">
        <div className="space-y-2">
          <label className="label" htmlFor="company">Selskapsnavn eller orgnr</label>
          <Input
            id="company"
            value={companyName}
            onChange={(event) => {
              setCompanyName(event.target.value);
              setError(null);
            }}
            placeholder="Skriv inn selskapsnavn"
          />
        </div>
        <div className="space-y-2">
          <label className="label" htmlFor="orgNumber">Org.nr (valgfritt)</label>
          <Input
            id="orgNumber"
            value={orgNumber}
            onChange={(event) => setOrgNumber(event.target.value)}
            placeholder="123 456 789"
          />
        </div>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <Button className="w-full" onClick={handleContinue}>
          Fortsett
        </Button>
      </Card>

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
        <Button
          variant="secondary"
          className="w-full"
          onClick={handleDemoResult}
          type="button"
          disabled={!state.selectedCompanyId}
        >
          Se demoresultat
        </Button>
      </section>
    </main>
  );
}
