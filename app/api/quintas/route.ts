import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const ubicacion = searchParams.get("ubicacion");
    const capacidad = searchParams.get("capacidad");

    const quintas = await prisma.quinta.findMany({
      where: {
        ...(ubicacion && {
          ubicacion: { contains: ubicacion },
        }),
        ...(capacidad && {
          capacidad: { gte: parseInt(capacidad) },
        }),
      },
      include: {
        propietario: {
          select: { nombre: true, email: true },
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

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json(
        { error: "Tenés que iniciar sesión" },
        { status: 401 }
      );
    }

    const { nombre, descripcion, ubicacion, precio, capacidad, amenities, emoji } =
      await req.json();

    if (!nombre || !descripcion || !ubicacion || !precio || !capacidad) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const quinta = await prisma.quinta.create({
      data: {
        nombre,
        descripcion,
        ubicacion,
        precio: parseFloat(precio),
        capacidad: parseInt(capacidad),
        amenities: amenities ?? "",
        emoji: emoji ?? "�",
        propietarioId: parseInt((session.user as any).id),
      },
    });

    return NextResponse.json(quinta, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear quinta" },
      { status: 500 }
    );
  }
}