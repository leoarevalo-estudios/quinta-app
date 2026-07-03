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

    const reservas = await prisma.reserva.findMany({
      where: {
        usuarioId: parseInt((session.user as any).id),
      },
      include: {
        quinta: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reservas);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener reservas" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Tenés que iniciar sesión" },
        { status: 401 }
      );
    }

    const { quintaId, fecha, personas } = await req.json();

    if (!quintaId || !fecha || !personas) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    // Verificar que no sea el propietario
    const quinta = await prisma.quinta.findUnique({
      where: { id: parseInt(quintaId) },
    });

    if (!quinta) {
      return NextResponse.json(
        { error: "Quinta no encontrada" },
        { status: 404 }
      );
    }

    if (quinta.propietarioId === parseInt((session.user as any).id)) {
      return NextResponse.json(
        { error: "No podés reservar tu propia quinta" },
        { status: 403 }
      );
    }

    const reserva = await prisma.reserva.create({
      data: {
        quintaId: parseInt(quintaId),
        fecha,
        personas: parseInt(personas),
        usuarioId: parseInt((session.user as any).id),
      },
    });

    // Notificar al propietario
    await prisma.notificacion.create({
      data: {
        usuarioId: quinta.propietarioId,
        mensaje: `Nueva reserva para ${quinta.nombre} el ${fecha} para ${personas} personas`,
      },
    });

    return NextResponse.json(reserva, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear reserva" },
      { status: 500 }
    );
  }
}