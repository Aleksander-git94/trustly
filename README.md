# SelskapsSjekk MVP

En mobil-først web-app som forklarer selskapsrisiko på en enkel måte for investering, jobbsøking eller ansatte.

## Kom i gang lokalt

```bash
npm install
npm run dev
```

Appen kjører på `http://localhost:3000`.

## Kjør tester

```bash
npm run test
```

## Arkitektur (kort)

- **DataProvider**: `ManualProvider` i `lib/data-provider.ts` er et grensesnitt som kan byttes ut med integrasjoner senere.
- **Risikomotor**: `lib/risk-engine.ts` bruker regelbasert scoring og genererer en rapport (`Report`).
- **Demo-data**: `lib/demo-data.ts` inneholder minst tre selskaper og ferdig utfylt `ManualInput`.

## Deploy til Vercel

1. Push repo til GitHub.
2. Opprett nytt prosjekt i Vercel og koble til repoet.
3. Velg `Next.js` som framework. Vercel oppdager dette automatisk.
4. Klikk **Deploy**.

## Åpne datakilder (forslag)

Se `docs/open-data-sources.md` for en oversikt over åpne og tilgjengelige datakilder vi kan koble på senere.
