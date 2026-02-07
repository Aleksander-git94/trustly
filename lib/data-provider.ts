import { ManualInput, Report } from "./types";
import { demoCompanies } from "./demo-data";
import { createReport } from "./risk-engine";

export type CompanySummary = {
  id: string;
  name: string;
  orgNumber?: string;
};

export interface DataProvider {
  listCompanies: () => CompanySummary[];
  getManualInputForCompany: (id: string) => ManualInput | null;
  getReport: (input: ManualInput) => Report;
}

export class ManualProvider implements DataProvider {
  listCompanies() {
    return demoCompanies.map((company) => ({
      id: company.id,
      name: company.name,
      orgNumber: company.orgNumber
    }));
  }

  getManualInputForCompany(id: string) {
    return demoCompanies.find((company) => company.id === id)?.manualInput ?? null;
  }

  getReport(input: ManualInput) {
    return createReport(input);
  }
}

export const manualProvider = new ManualProvider();
