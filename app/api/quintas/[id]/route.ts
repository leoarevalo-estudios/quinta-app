import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const quinta = await prisma.quinta.findUnique({
      where: { id: parseInt(id) },
      include: {
        propietario: {
          select: { nombre: true, email: true },
        },
      },
    });

    if (!quinta) {
      return NextResponse.json(
        { error: "Quinta no encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(quinta);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener quinta" },
      { status: 500 }
    );
  }
}