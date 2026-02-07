export type Purpose = "invest" | "apply_job" | "employee";

export type ManualInput = {
  companyName: string;
  orgNumber?: string;
  purpose: Purpose;

  profitabilityLast12m?: "yes" | "no" | "unknown";
  positiveCashflow?: "yes" | "no" | "unknown";
  cashRunwayMonths?: "0_3" | "3_6" | "6_12" | "12_plus" | "unknown";
  debtHigh?: "yes" | "no" | "unknown";
  customerConcentrationHigh?: "yes" | "no" | "unknown";

  layoffsOrHiringFreeze?: "yes" | "no" | "unknown";
  teamTurnover?: "low" | "medium" | "high" | "unknown";
  contractType?: "permanent" | "temporary" | "contractor" | "unknown";
  pensionLevel?: "minimum" | "above_minimum" | "unknown";
  insurances?: "strong" | "basic" | "unknown";

  lawsuitsOrRegulatoryRisk?: "yes" | "no" | "unknown";
  keyPersonDependency?: "yes" | "no" | "unknown";
};

export type RiskLevel = "green" | "yellow" | "red";

export type RiskCard = {
  id: "economy" | "job_security" | "governance" | "legal_ops";
  score: number;
  level: RiskLevel;
  title: string;
  summary: string;
  reasons: string[];
  whatItMeans: string[];
  recommendedActions: string[];
};

export type Report = {
  companyName: string;
  purpose: Purpose;
  overallScore: number;
  overallLevel: RiskLevel;
  cards: RiskCard[];
  redFlags: string[];
  questionsToAsk: string[];
};
