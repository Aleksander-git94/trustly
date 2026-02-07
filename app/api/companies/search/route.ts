import { NextResponse } from "next/server";

const BRREG_SEARCH_URL = "https://data.brreg.no/enhetsregisteret/api/enheter";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json([], { status: 200 });
  }

  const response = await fetch(`${BRREG_SEARCH_URL}?navn=${encodeURIComponent(query)}`);

  if (!response.ok) {
    return NextResponse.json({ message: "Brreg-feil" }, { status: response.status });
  }

  const data = await response.json();
  const items = (data?._embedded?.enheter ?? []).map((item: any) => ({
    orgNumber: item.organisasjonsnummer,
    name: item.navn,
    industryDescription: item?.naeringskode1?.beskrivelse
  }));

  return NextResponse.json(items);
}
