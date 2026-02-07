import { z } from "zod";
import { ManualInput } from "./types";

const yesNoUnknown = z.enum(["yes", "no", "unknown"]);

export const manualInputSchema = z.object({
  companyName: z.string().min(1, "Selskapsnavn er påkrevd"),
  orgNumber: z.string().optional(),
  purpose: z.enum(["invest", "apply_job", "employee"]),
  profitabilityLast12m: yesNoUnknown.optional(),
  positiveCashflow: yesNoUnknown.optional(),
  cashRunwayMonths: z
    .enum(["0_3", "3_6", "6_12", "12_plus", "unknown"])
    .optional(),
  debtHigh: yesNoUnknown.optional(),
  customerConcentrationHigh: yesNoUnknown.optional(),
  layoffsOrHiringFreeze: yesNoUnknown.optional(),
  teamTurnover: z.enum(["low", "medium", "high", "unknown"]).optional(),
  contractType: z
    .enum(["permanent", "temporary", "contractor", "unknown"])
    .optional(),
  pensionLevel: z.enum(["minimum", "above_minimum", "unknown"]).optional(),
  insurances: z.enum(["strong", "basic", "unknown"]).optional(),
  lawsuitsOrRegulatoryRisk: yesNoUnknown.optional(),
  keyPersonDependency: yesNoUnknown.optional()
});

export type ManualInputFormValues = z.infer<typeof manualInputSchema>;

export const ensureManualInput = (values: ManualInputFormValues): ManualInput => {
  return manualInputSchema.parse(values);
};
