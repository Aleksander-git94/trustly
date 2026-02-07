import { describe, expect, it } from "vitest";
import { createReport } from "../lib/risk-engine";
import { ManualInput } from "../lib/types";

const baseInput: ManualInput = {
  companyName: "Test AS",
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

describe("risk-engine rules", () => {
  it("adds economy risk for no profitability", () => {
    const report = createReport({ ...baseInput, profitabilityLast12m: "no" });
    const economy = report.cards.find((card) => card.id === "economy");
    expect(economy?.score).toBe(70);
  });

  it("adds economy risk for negative cashflow", () => {
    const report = createReport({ ...baseInput, positiveCashflow: "no" });
    const economy = report.cards.find((card) => card.id === "economy");
    expect(economy?.score).toBe(70);
  });

  it("adds economy risk for short runway", () => {
    const report = createReport({ ...baseInput, cashRunwayMonths: "0_3" });
    const economy = report.cards.find((card) => card.id === "economy");
    expect(economy?.score).toBe(75);
  });

  it("reduces economy risk for long runway", () => {
    const report = createReport({ ...baseInput, cashRunwayMonths: "12_plus" });
    const economy = report.cards.find((card) => card.id === "economy");
    expect(economy?.score).toBe(40);
  });

  it("adds job security risk for layoffs", () => {
    const report = createReport({ ...baseInput, layoffsOrHiringFreeze: "yes" });
    const job = report.cards.find((card) => card.id === "job_security");
    expect(job?.score).toBe(70);
  });

  it("adds job security risk for high turnover", () => {
    const report = createReport({ ...baseInput, teamTurnover: "high" });
    const job = report.cards.find((card) => card.id === "job_security");
    expect(job?.score).toBe(65);
  });

  it("adds governance risk for key person dependency", () => {
    const report = createReport({ ...baseInput, keyPersonDependency: "yes" });
    const governance = report.cards.find((card) => card.id === "governance");
    expect(governance?.score).toBe(65);
  });

  it("adds legal ops risk for lawsuits", () => {
    const report = createReport({ ...baseInput, lawsuitsOrRegulatoryRisk: "yes" });
    const legal = report.cards.find((card) => card.id === "legal_ops");
    expect(legal?.score).toBe(75);
  });
});
