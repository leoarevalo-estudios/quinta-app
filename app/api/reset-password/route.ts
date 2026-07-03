import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const tokenData = await prisma.tokenRecuperacion.findUnique({
      where: { token },
    });

    if (!tokenData) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 400 }
      );
    }

    if (tokenData.usado) {
      return NextResponse.json(
        { error: "Este link ya fue utilizado" },
        { status: 400 }
      );
    }

    if (new Date() > tokenData.expira) {
      return NextResponse.json(
        { error: "El link expiró. Solicitá uno nuevo" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email: tokenData.email },
      data: { password: hash },
    });

    await prisma.tokenRecuperacion.update({
      where: { token },
      data: { usado: true },
    });

    return NextResponse.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al restablecer la contraseña" },
      { status: 500 }
    );
  }
}