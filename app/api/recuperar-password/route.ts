import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "El email es obligatorio" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({
        message: "Si el email existe, recibirás un link en breve",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expira = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.tokenRecuperacion.create({
      data: { token, email, expira },
    });

    const link = `${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/recuperar-password/${token}`;

    return NextResponse.json({
      message: "Si el email existe, recibirás un link en breve",
      link,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}