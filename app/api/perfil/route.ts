import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function PATCH(req: Request) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { nombre, email, telefono } = await req.json();

    const user = await prisma.user.update({
      where: { id: parseInt((session.user as any).id) },
      data: { nombre, email, telefono },
    });

    return NextResponse.json({ nombre: user.nombre, email: user.email, telefono: user.telefono });
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar perfil" }, { status: 500 });
  }
}