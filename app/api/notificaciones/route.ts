import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const notificaciones = await prisma.notificacion.findMany({
      where: { usuarioId: parseInt((session.user as any).id) },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json(notificaciones);
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}

export async function PATCH() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    await prisma.notificacion.updateMany({
      where: {
        usuarioId: parseInt((session.user as any).id),
        leida: false,
      },
      data: { leida: true },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}