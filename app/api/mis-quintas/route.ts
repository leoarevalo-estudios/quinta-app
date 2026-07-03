import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Tenés que iniciar sesión" },
        { status: 401 }
      );
    }

    const quintas = await prisma.quinta.findMany({
      where: {
        propietarioId: parseInt((session.user as any).id),
      },
      include: {
        reservas: {
          include: {
            usuario: {
              select: { nombre: true, email: true, telefono: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quintas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener quintas" },
      { status: 500 }
    );
  }
}