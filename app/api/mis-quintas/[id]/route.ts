import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;
    const { nombre, descripcion, ubicacion, precio, capacidad, amenities, emoji } =
      await req.json();

    const quinta = await prisma.quinta.update({
      where: {
        id: parseInt(id),
        propietarioId: parseInt((session.user as any).id),
      },
      data: {
        nombre,
        descripcion,
        ubicacion,
        precio: parseFloat(precio),
        capacidad: parseInt(capacidad),
        amenities,
        emoji,
      },
    });

    return NextResponse.json(quinta);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { id } = await params;

    // Primero eliminamos las reservas asociadas
    await prisma.reserva.deleteMany({
      where: { quintaId: parseInt(id) },
    });

    await prisma.quinta.delete({
      where: {
        id: parseInt(id),
        propietarioId: parseInt((session.user as any).id),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Error al eliminar" }, { status: 500 });
  }
}