# Åpne og tilgjengelige datakilder (forslag)

Nedenfor er åpne datakilder vi kan koble til for å hente selskapsdata uten at brukeren må svare på spørsmål.

## Norge (offentlige kilder)

### Brønnøysundregistrene (Brreg)
- **Enhetsregisteret**: grunnleggende selskapsdata (navn, orgnr, adresse, status, bransjekoder).
- **Foretaksregisteret**: mer detaljer om foretaksform, styre, roller og registreringer.
- **Regnskapsregisteret**: publiserte regnskaper og innsendte årsregnskap (når tilgjengelig i åpne formater).

**Hvorfor nyttig:** gir grunnstruktur, status og noen grunnleggende økonomisignaler som kan mappes til risikomodellen.

### SSB (Statistisk sentralbyrå)
- **Bransjestatistikk**: makrotrender per næring (f.eks. lønnsomhet, konkursrate, sysselsetting).
- **Arbeidsmarked**: sysselsetting og regionale trender.

**Hvorfor nyttig:** kan brukes til kontekst og baseline for risiko i en bransje (f.eks. røde flagg i utsatte næringer).

### NAV (åpne datasett)
- **Arbeidsmarked og permitteringer**: aggregate trender og utvikling i ulike bransjer/regioner.

**Hvorfor nyttig:** supplerer jobbtrygghet‑indikatorer med bransjesignal.

## Generelle åpne kilder (internasjonalt)

### Offentlige selskapsregistre
- Mange land har åpne registre for selskapsinformasjon (navn, orgnr, status, direktorater).

### Åpne regnskapsregistre
- Enkelte land publiserer regnskap i åpne formater (PDF/XBRL). Kan brukes der tilgang tillater det.

## Hvordan vi kan bruke dem

- **Grunnprofil**: navn, orgnr, status, bransje → baseline for vurdering.
- **Økonomi**: regnskapsdata → signaler til økonomiscore.
- **Jobbtrygghet**: bransje‑ og arbeidsmarkedsindikatorer → signaler til jobbtrygghet.
- **Ledelse/styring**: roller og registreringer → signaler til governance.
- **Juridisk/operasjonell**: status/merknader og regulatoriske hendelser der det finnes åpne kilder.

## Neste steg (MVP+)

- Lage egne `DataProvider`‑implementasjoner per datakilde.
- Koble sammen flere kilder til en felles `AggregateProvider`.
- Dokumentere mapping fra datakilde → `ManualInput`/scores.
