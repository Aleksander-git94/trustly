import { ManualInput } from "./types";

export type OpenCompany = {
  orgNumber: string;
  name: string;
  industryDescription?: string;
};

export const searchOpenCompanies = async (query: string): Promise<OpenCompany[]> => {
  const response = await fetch(`/api/companies/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error("Kunne ikke hente åpne data");
  }
  return response.json();
};

export const mapToManualInput = (company: OpenCompany): ManualInput => {
  return {
    companyName: company.name,
    orgNumber: company.orgNumber,
    purpose: "invest",
    profitabilityLast12m: "unknown",
    positiveCashflow: "unknown",
    cashRunwayMonths: "unknown",
    debtHigh: "unknown",
    customerConcentrationHigh: "unknown",
    layoffsOrHiringFreeze: "unknown",
    teamTurnover: "unknown",
    contractType: "unknown",
    pensionLevel: "unknown",
    insurances: "unknown",
    lawsuitsOrRegulatoryRisk: "unknown",
    keyPersonDependency: "unknown"
  };
};
