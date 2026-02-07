import { ManualInput } from "./types";

export type DemoCompany = {
  id: string;
  name: string;
  orgNumber: string;
  manualInput: ManualInput;
};

export const demoCompanies: DemoCompany[] = [
  {
    id: "fjordkraft-labs",
    name: "Fjordkraft Labs AS",
    orgNumber: "998877665",
    manualInput: {
      companyName: "Fjordkraft Labs AS",
      orgNumber: "998877665",
      purpose: "invest",
      profitabilityLast12m: "yes",
      positiveCashflow: "yes",
      cashRunwayMonths: "12_plus",
      debtHigh: "no",
      customerConcentrationHigh: "no",
      layoffsOrHiringFreeze: "no",
      teamTurnover: "low",
      contractType: "permanent",
      pensionLevel: "above_minimum",
      insurances: "strong",
      lawsuitsOrRegulatoryRisk: "no",
      keyPersonDependency: "no"
    }
  },
  {
    id: "nordic-wood",
    name: "Nordic Woodworks AS",
    orgNumber: "912345678",
    manualInput: {
      companyName: "Nordic Woodworks AS",
      orgNumber: "912345678",
      purpose: "apply_job",
      profitabilityLast12m: "no",
      positiveCashflow: "no",
      cashRunwayMonths: "3_6",
      debtHigh: "yes",
      customerConcentrationHigh: "yes",
      layoffsOrHiringFreeze: "yes",
      teamTurnover: "high",
      contractType: "temporary",
      pensionLevel: "minimum",
      insurances: "basic",
      lawsuitsOrRegulatoryRisk: "yes",
      keyPersonDependency: "yes"
    }
  },
  {
    id: "healthspark",
    name: "HealthSpark Technologies",
    orgNumber: "934567890",
    manualInput: {
      companyName: "HealthSpark Technologies",
      orgNumber: "934567890",
      purpose: "employee",
      profitabilityLast12m: "unknown",
      positiveCashflow: "unknown",
      cashRunwayMonths: "6_12",
      debtHigh: "unknown",
      customerConcentrationHigh: "no",
      layoffsOrHiringFreeze: "no",
      teamTurnover: "medium",
      contractType: "permanent",
      pensionLevel: "above_minimum",
      insurances: "strong",
      lawsuitsOrRegulatoryRisk: "no",
      keyPersonDependency: "yes"
    }
  }
];
