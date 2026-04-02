import { NextResponse } from "next/server";

import { getLocale } from "@/lib/i18n";
import { getSampleExams } from "@/lib/sample-data";

export async function GET() {
  const locale = await getLocale();
  return NextResponse.json(getSampleExams(locale));
}
