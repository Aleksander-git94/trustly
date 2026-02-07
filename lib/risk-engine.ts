import { ManualInput, Purpose, Report, RiskCard, RiskLevel } from "./types";

const clampScore = (score: number) => Math.min(100, Math.max(0, score));

const levelFromScore = (score: number): RiskLevel => {
  if (score <= 34) return "green";
  if (score <= 64) return "yellow";
  return "red";
};

type CardConfig = {
  id: RiskCard["id"];
  title: string;
  baseSummary: {
    green: string;
    yellow: string;
    red: string;
  };
};

const cardConfigs: Record<RiskCard["id"], CardConfig> = {
  economy: {
    id: "economy",
    title: "Økonomi",
    baseSummary: {
      green: "Økonomien ser stabil ut med få tegn til akutt risiko.",
      yellow: "Økonomien har noen varsellamper som bør undersøkes nærmere.",
      red: "Økonomien har tydelige risikoer som kan påvirke selskapet raskt."
    }
  },
  job_security: {
    id: "job_security",
    title: "Jobbtrygghet",
    baseSummary: {
      green: "Jobbtryggheten virker god basert på dagens signaler.",
      yellow: "Det er blandede signaler om jobbtrygghet.",
      red: "Det er høy risiko for kutt eller ustabilitet i jobbtrygghet."
    }
  },
  governance: {
    id: "governance",
    title: "Ledelse/styring",
    baseSummary: {
      green: "Ledelse og styring ser ut til å være robust.",
      yellow: "Det finnes tegn på sårbarhet i ledelse og styring.",
      red: "Ledelse og styring har klare sårbarheter."
    }
  },
  legal_ops: {
    id: "legal_ops",
    title: "Juridisk/operasjonell",
    baseSummary: {
      green: "Få juridiske eller operative varsler er synlige.",
      yellow: "Det er noen juridiske/operative forhold å følge opp.",
      red: "Juridiske/operative forhold øker risikoen betydelig."
    }
  }
};

const purposeText: Record<Purpose, Record<RiskCard["id"], string[]>> = {
  invest: {
    economy: [
      "Som investor bør du forstå hvor lenge selskapet kan finansiere vekst.",
      "Stabil kontantstrøm gjør det lettere å planlegge investeringer."
    ],
    job_security: [
      "Sterke team gir bedre gjennomføring av strategi.",
      "Høy turnover kan øke kostnader og stoppe fremdrift."
    ],
    governance: [
      "Avhengighet av få personer kan gjøre selskapet sårbart.",
      "Klare beslutningslinjer gir forutsigbarhet."
    ],
    legal_ops: [
      "Juridiske tvister kan påvirke verdien raskt.",
      "Regulatorisk risiko kan gi ekstra kostnader."
    ]
  },
  apply_job: {
    economy: [
      "Økonomisk stabilitet betyr mindre risiko for uventede kutt.",
      "Kontantstrøm sier noe om evnen til å betale lønn fremover."
    ],
    job_security: [
      "Lav turnover betyr ofte mer stabile team.",
      "Midlertidige kontrakter kan bety mindre sikkerhet."
    ],
    governance: [
      "God ledelse betyr tydelige forventninger og støtte.",
      "Sårbar ledelse kan gi ustabile prioriteringer."
    ],
    legal_ops: [
      "Juridiske problemer kan gi usikkerhet i hverdagen.",
      "Operative utfordringer kan føre til stress og omstillinger."
    ]
  },
  employee: {
    economy: [
      "Sunn økonomi gir tryggere arbeidsplass over tid.",
      "Kort runway betyr ofte raske endringer."
    ],
    job_security: [
      "Stabile team gir bedre arbeidsmiljø.",
      "Høy turnover kan gi mer arbeidsbelastning."
    ],
    governance: [
      "Klare beslutninger gjør det enklere å levere.",
      "Avhengighet av få personer kan gi uforutsigbarhet."
    ],
    legal_ops: [
      "Regulatorisk risiko kan gi endringer i arbeidsprosesser.",
      "Tvister kan påvirke drift og omdømme."
    ]
  }
};

const actionsText: Record<Purpose, Record<RiskCard["id"], string[]>> = {
  invest: {
    economy: [
      "Spør om runway og finansieringsplan.",
      "Be om oppdatert kontantstrømsanalyse."
    ],
    job_security: [
      "Undersøk turnover de siste 12 månedene.",
      "Spør hvordan selskapet beholder nøkkelkompetanse."
    ],
    governance: [
      "Kartlegg hvem som tar beslutninger ved fravær.",
      "Be om styresammensetning og rapportering."
    ],
    legal_ops: [
      "Spør om pågående tvister og risikoavsetninger.",
      "Sjekk regulatorisk etterlevelse i bransjen."
    ]
  },
  apply_job: {
    economy: [
      "Spør om finansiering og vekstplaner.",
      "Be om oppdaterte nøkkeltall for likviditet."
    ],
    job_security: [
      "Spør om ansettelsesplaner for teamet.",
      "Be om å se personalpolitikk og turnover-tall."
    ],
    governance: [
      "Spør hvem du rapporterer til og hvordan beslutninger tas.",
      "Be om eksempler på prioriteringer i krevende perioder."
    ],
    legal_ops: [
      "Spør om eventuelle tvister som påvirker drift.",
      "Be om status på regulatoriske krav."
    ]
  },
  employee: {
    economy: [
      "Spør om kontantstrøm og plan for neste 12 måneder.",
      "Be om signaler på mulige kutt eller investeringer."
    ],
    job_security: [
      "Spør om kompetanseplaner og læringsmuligheter.",
      "Be om innsikt i sykefravær og turnover."
    ],
    governance: [
      "Spør om støtte ved endringer og prioriteringer.",
      "Be om tydelig ansvarslinje i teamet."
    ],
    legal_ops: [
      "Spør om driftshendelser og hvordan de håndteres.",
      "Be om innsikt i compliance-arbeid."
    ]
  }
};

const questionsToAskByPurpose: Record<Purpose, string[]> = {
  invest: [
    "Hvordan ser runway ut de neste 12 månedene?",
    "Hva er planlagt kapitalbehov?",
    "Hvordan er kontantstrømmen måned for måned?",
    "Hvilke kunder står for mest inntekter?",
    "Hvordan ser churn/retensjon ut?",
    "Har dere hatt permitteringer nylig?",
    "Hva er største operasjonelle risiko?",
    "Hvilke regulatoriske krav kan påvirke vekst?",
    "Hvordan sikrer dere at nøkkelpersoner blir?",
    "Hva er planen dersom inntekter faller?"
  ],
  apply_job: [
    "Hvordan er selskapets økonomiske plan for det neste året?",
    "Hvordan har turnover vært det siste året?",
    "Hvordan støttes ansatte i omstillinger?",
    "Hva er planen for ansettelse i teamet mitt?",
    "Finnes det lærings- og karriereløp?",
    "Hvordan håndteres perioder med høy belastning?",
    "Hvilke kundeavhengigheter finnes?",
    "Har selskapet hatt juridiske tvister nylig?",
    "Hvordan er pensjon og forsikringer?",
    "Hva er viktigste prioriteringer for ledelsen nå?"
  ],
  employee: [
    "Hva er forventningene til teamets kapasitet neste 12 måneder?",
    "Finnes det planer om omorganisering?",
    "Hvordan ser kompetanseutvikling ut?",
    "Hvilke forbedringer er prioritert i arbeidsmiljøet?",
    "Hvordan håndteres kundekonsentrasjon?",
    "Er det nylige regulatoriske endringer som påvirker oss?",
    "Hva er selskapets viktigste risiko akkurat nå?",
    "Hvordan håndteres sykefravær og belastning?",
    "Hva er planene for lønn og goder?",
    "Hvem kan ta beslutninger hvis nøkkelpersoner slutter?"
  ]
};

const addReason = (reasons: string[], condition: boolean, text: string) => {
  if (condition) reasons.push(text);
};

const computeEconomy = (input: ManualInput) => {
  let score = 50;
  const reasons: string[] = [];
  addReason(
    reasons,
    input.profitabilityLast12m === "no",
    "Selskapet har ikke vært lønnsomt siste 12 måneder."
  );
  if (input.profitabilityLast12m === "no") score += 20;

  addReason(
    reasons,
    input.positiveCashflow === "no",
    "Negativ kontantstrøm øker risiko for kutt."
  );
  if (input.positiveCashflow === "no") score += 20;

  if (input.cashRunwayMonths === "0_3") {
    score += 25;
    reasons.push("Kort runway under 3 måneder gir høy likviditetsrisiko.");
  }
  if (input.cashRunwayMonths === "3_6") {
    score += 15;
    reasons.push("Runway på 3–6 måneder gir behov for rask finansiering.");
  }
  if (input.cashRunwayMonths === "6_12") {
    score += 5;
    reasons.push("Runway på 6–12 måneder er ok, men bør følges opp.");
  }
  if (input.cashRunwayMonths === "12_plus") {
    score -= 10;
    reasons.push("Runway over 12 måneder gir økonomisk trygghet.");
  }

  if (input.debtHigh === "yes") {
    score += 10;
    reasons.push("Høy gjeld øker sårbarhet ved inntektsfall.");
  }
  if (input.customerConcentrationHigh === "yes") {
    score += 10;
    reasons.push("Stor kundekonsentrasjon øker risiko dersom en kunde faller bort.");
  }

  return { score: clampScore(score), reasons };
};

const computeJobSecurity = (input: ManualInput) => {
  let score = 50;
  const reasons: string[] = [];

  if (input.layoffsOrHiringFreeze === "yes") {
    score += 20;
    reasons.push("Nedbemanning eller ansettelsesstopp signaliserer kutt.");
  }
  if (input.teamTurnover === "high") {
    score += 15;
    reasons.push("Høy turnover kan bety ustabilitet i teamet.");
  }
  if (input.teamTurnover === "medium") {
    score += 8;
    reasons.push("Middels turnover kan påvirke kontinuitet.");
  }
  if (input.teamTurnover === "low") {
    score -= 5;
    reasons.push("Lav turnover tyder på stabile team.");
  }
  if (input.contractType === "temporary") {
    score += 10;
    reasons.push("Midlertidige kontrakter gir lavere trygghet.");
  }
  if (input.contractType === "contractor") {
    score += 15;
    reasons.push("Konsulentkontrakter gir høyere usikkerhet.");
  }
  if (input.contractType === "permanent") {
    score -= 5;
    reasons.push("Fast ansettelse gir mer trygghet.");
  }
  if (input.pensionLevel === "minimum") {
    score += 5;
    reasons.push("Minstepensjon kan bety strammere personalgoder.");
  }
  if (input.pensionLevel === "above_minimum") {
    score -= 5;
    reasons.push("Pensjon over minimum gir ekstra trygghet.");
  }
  if (input.insurances === "basic") {
    score += 5;
    reasons.push("Grunnleggende forsikringer gir mindre sikkerhetsnett.");
  }
  if (input.insurances === "strong") {
    score -= 5;
    reasons.push("Gode forsikringer gir bedre trygghet.");
  }

  return { score: clampScore(score), reasons };
};

const computeGovernance = (input: ManualInput) => {
  let score = 50;
  const reasons: string[] = [];

  if (input.teamTurnover === "high") {
    score += 10;
    reasons.push("Høy turnover gjør ledelse mer sårbar.");
  }
  if (input.keyPersonDependency === "yes") {
    score += 15;
    reasons.push("Selskapet er avhengig av nøkkelpersoner.");
  }
  if (input.customerConcentrationHigh === "yes") {
    score += 5;
    reasons.push("Få kunder gir mindre rom for ledelsesfeil.");
  }

  return { score: clampScore(score), reasons };
};

const computeLegalOps = (input: ManualInput) => {
  let score = 50;
  const reasons: string[] = [];

  if (input.lawsuitsOrRegulatoryRisk === "yes") {
    score += 25;
    reasons.push("Pågående juridisk eller regulatorisk risiko kan påvirke drift.");
  }
  if (input.keyPersonDependency === "yes") {
    score += 10;
    reasons.push("Avhengighet av nøkkelpersoner gir operasjonell risiko.");
  }
  if (input.customerConcentrationHigh === "yes") {
    score += 10;
    reasons.push("Kundekonsentrasjon gir ekstra operasjonell sårbarhet.");
  }

  return { score: clampScore(score), reasons };
};

const buildCard = (
  id: RiskCard["id"],
  input: ManualInput,
  score: number,
  reasons: string[]
): RiskCard => {
  const level = levelFromScore(score);
  const config = cardConfigs[id];
  const summary = config.baseSummary[level];
  const purpose = input.purpose;

  return {
    id,
    score,
    level,
    title: config.title,
    summary,
    reasons: reasons.length ? reasons : ["Ingen tydelige signaler ble valgt."],
    whatItMeans: purposeText[purpose][id],
    recommendedActions: actionsText[purpose][id]
  };
};

const unique = (items: string[]) => Array.from(new Set(items));

export const createReport = (input: ManualInput): Report => {
  const economy = computeEconomy(input);
  const jobSecurity = computeJobSecurity(input);
  const governance = computeGovernance(input);
  const legalOps = computeLegalOps(input);

  const cards: RiskCard[] = [
    buildCard("economy", input, economy.score, economy.reasons),
    buildCard("job_security", input, jobSecurity.score, jobSecurity.reasons),
    buildCard("governance", input, governance.score, governance.reasons),
    buildCard("legal_ops", input, legalOps.score, legalOps.reasons)
  ];

  const overallScore = Math.round(
    cards.reduce((sum, card) => sum + card.score, 0) / cards.length
  );
  const overallLevel = levelFromScore(overallScore);

  const redFlags = unique(
    cards
      .filter((card) => card.level === "red")
      .flatMap((card) => card.reasons)
      .concat(
        input.layoffsOrHiringFreeze === "yes"
          ? ["Nedbemanning eller ansettelsesstopp pågår."]
          : [],
        input.lawsuitsOrRegulatoryRisk === "yes"
          ? ["Juridiske eller regulatoriske risikoer er rapportert."]
          : [],
        input.cashRunwayMonths === "0_3"
          ? ["Runway under 3 måneder kan gi akutte tiltak."]
          : []
      )
  );

  return {
    companyName: input.companyName,
    purpose: input.purpose,
    overallScore,
    overallLevel,
    cards,
    redFlags: redFlags.length ? redFlags : ["Ingen tydelige røde flagg basert på svarene."],
    questionsToAsk: questionsToAskByPurpose[input.purpose]
  };
};
