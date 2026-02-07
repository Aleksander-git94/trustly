import { ManualInput } from "./types";

export type QuestionOption = {
  value: string;
  label: string;
};

export type QuestionConfig = {
  id: keyof ManualInput;
  title: string;
  description: string;
  options: QuestionOption[];
};

export const questions: QuestionConfig[] = [
  {
    id: "profitabilityLast12m",
    title: "Har selskapet vært lønnsomt de siste 12 månedene?",
    description: "Lønnsomhet betyr at selskapet tjener mer enn det bruker.",
    options: [
      { value: "yes", label: "Ja" },
      { value: "no", label: "Nei" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "positiveCashflow",
    title: "Har selskapet positiv kontantstrøm?",
    description: "Kontantstrøm er penger inn minus penger ut.",
    options: [
      { value: "yes", label: "Ja" },
      { value: "no", label: "Nei" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "cashRunwayMonths",
    title: "Hvor lenge kan selskapet klare seg uten ny finansiering?",
    description: "Runway sier hvor mange måneder dagens penger varer.",
    options: [
      { value: "0_3", label: "0–3 måneder" },
      { value: "3_6", label: "3–6 måneder" },
      { value: "6_12", label: "6–12 måneder" },
      { value: "12_plus", label: "12+ måneder" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "debtHigh",
    title: "Har selskapet høy gjeld?",
    description: "Høy gjeld betyr større kostnader når inntektene svinger.",
    options: [
      { value: "yes", label: "Ja" },
      { value: "no", label: "Nei" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "customerConcentrationHigh",
    title: "Er selskapet avhengig av få store kunder?",
    description: "Få kunder betyr større risiko hvis en kunde faller bort.",
    options: [
      { value: "yes", label: "Ja" },
      { value: "no", label: "Nei" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "layoffsOrHiringFreeze",
    title: "Har selskapet hatt nedbemanning eller ansettelsesstopp?",
    description: "Dette kan signalisere økonomisk press.",
    options: [
      { value: "yes", label: "Ja" },
      { value: "no", label: "Nei" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "teamTurnover",
    title: "Hvor høy er turnover i teamet?",
    description: "Turnover betyr hvor mange som slutter eller byttes ut.",
    options: [
      { value: "low", label: "Lav" },
      { value: "medium", label: "Middels" },
      { value: "high", label: "Høy" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "contractType",
    title: "Hva slags kontrakt gjelder?",
    description: "Fast kontrakt gir ofte mer trygghet enn midlertidig.",
    options: [
      { value: "permanent", label: "Fast" },
      { value: "temporary", label: "Midlertidig" },
      { value: "contractor", label: "Konsulent" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "pensionLevel",
    title: "Hvilket pensjonsnivå tilbyr selskapet?",
    description: "Pensjon over minimum gir ekstra trygghet.",
    options: [
      { value: "minimum", label: "Minste nivå" },
      { value: "above_minimum", label: "Over minimum" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "insurances",
    title: "Hvordan er forsikringene?",
    description: "Gode forsikringer gir bedre sikkerhetsnett.",
    options: [
      { value: "strong", label: "Gode" },
      { value: "basic", label: "Grunnleggende" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "lawsuitsOrRegulatoryRisk",
    title: "Finnes det juridiske eller regulatoriske risikoer?",
    description: "Tvister kan gi ekstra kostnader og omstilling.",
    options: [
      { value: "yes", label: "Ja" },
      { value: "no", label: "Nei" },
      { value: "unknown", label: "Vet ikke" }
    ]
  },
  {
    id: "keyPersonDependency",
    title: "Er selskapet avhengig av en eller få nøkkelpersoner?",
    description: "Høy avhengighet kan gi sårbar drift.",
    options: [
      { value: "yes", label: "Ja" },
      { value: "no", label: "Nei" },
      { value: "unknown", label: "Vet ikke" }
    ]
  }
];
