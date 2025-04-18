import { NextResponse } from "next/server";
import ai from "@/utils/ai";

export async function GET(req: Request) {
  try {
    const { prompt } = await req.json();
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Crie um plano detalhado para o seguinte objetivo: ${prompt}. O plano deve conter atividades divididas por dia da semana. O formato da resposta deve ser JSON: schedule: { day: string, subjects: { time: string, subject: string, }[] }[].`,
    });
    const text = response.text;

    let cleanText = text!.trim();

    if (cleanText.startsWith("```")) {
      cleanText = cleanText
        .replace(/```(?:json)?\n?/, "")
        .replace(/```$/, "")
        .trim();
    }

    console.log(cleanText);

    return NextResponse.json({ plan: JSON.parse(cleanText!) });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao gerar plano" }, { status: 500 });
  }
}
