"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { manualProvider } from "../lib/data-provider";
import { mapToManualInput, searchOpenCompanies } from "../lib/open-data-provider";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { useAppStore } from "./store";

export default function HomePage() {
  const router = useRouter();
  const { state, setSelectedCompanyId, setManualInput } = useAppStore();
  const [query, setQuery] = useState("");
  const [openQuery, setOpenQuery] = useState("");
  const [openResults, setOpenResults] = useState<
    { orgNumber: string; name: string; industryDescription?: string }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");

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
    if (!state.selectedCompanyId && !state.manualInput) {
      setError("Velg et selskap for å fortsette.");
      return;
    }
    router.push("/purpose");
  };

  const handleSelectDemo = (id: string) => {
    const demo = manualProvider.getManualInputForCompany(id);
    if (!demo) return;
    setSelectedCompanyId(id);
    setManualInput(null);
    setError(null);
  };

  const handleSearchOpenData = async () => {
    if (!openQuery.trim()) {
      setError("Skriv inn et selskapsnavn eller orgnr.");
      return;
    }
    setIsSearching(true);
    setError(null);
    try {
      const results = await searchOpenCompanies(openQuery.trim());
      setOpenResults(results);
      if (results.length === 0) {
        setError("Fant ingen treff i åpne kilder.");
      }
    } catch (err) {
      console.error(err);
      setError("Kunne ikke hente data fra åpne kilder.");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectOpenCompany = (company: {
    orgNumber: string;
    name: string;
    industryDescription?: string;
  }) => {
    setSelectedCompanyId(null);
    setManualInput(mapToManualInput(company));
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

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Søk i åpne kilder</h2>
          <span className="text-xs text-slate-500">Enhetsregisteret</span>
        </div>
        <Input
          value={openQuery}
          onChange={(event) => setOpenQuery(event.target.value)}
          placeholder="Søk på selskapsnavn eller orgnr"
        />
        <Button onClick={handleSearchOpenData} disabled={isSearching}>
          {isSearching ? "Søker..." : "Søk"}
        </Button>
        <div className="grid gap-3">
          {openResults.map((company) => (
            <button
              key={company.orgNumber}
              type="button"
              onClick={() => handleSelectOpenCompany(company)}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm hover:border-brand-600"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700">
                  {getInitials(company.name)}
                </div>
                <div>
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-xs text-slate-500">Org.nr: {company.orgNumber}</p>
                </div>
              </div>
              {company.industryDescription ? (
                <p className="mt-2 text-xs text-slate-500">{company.industryDescription}</p>
              ) : null}
            </button>
          ))}
        </div>
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
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {getInitials(company.name)}
                </div>
                <div>
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-xs text-slate-500">Org.nr: {company.orgNumber}</p>
                </div>
              </div>
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
