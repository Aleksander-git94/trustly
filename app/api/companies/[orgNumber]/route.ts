import { NextResponse } from "next/server";

const BRREG_DETAIL_URL = "https://data.brreg.no/enhetsregisteret/api/enheter";

export async function GET(
  request: Request,
  { params }: { params: { orgNumber: string } }
) {
  const orgNumber = params.orgNumber;
  if (!orgNumber) {
    return NextResponse.json({ message: "Mangler orgnr" }, { status: 400 });
  }

  const response = await fetch(`${BRREG_DETAIL_URL}/${encodeURIComponent(orgNumber)}`);

  if (!response.ok) {
    return NextResponse.json({ message: "Brreg-feil" }, { status: response.status });
  }

  const item = await response.json();

  return NextResponse.json({
    orgNumber: item.organisasjonsnummer,
    name: item.navn,
    industryDescription: item?.naeringskode1?.beskrivelse
  });
}
