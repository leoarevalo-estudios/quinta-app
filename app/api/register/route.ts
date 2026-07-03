import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { nombre, email, password, telefono, rol } = await req.json();

    if (!nombre || !email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son obligatorios" },
        { status: 400 }
      );
    }

    const existente = await prisma.user.findUnique({ where: { email } });
    if (existente) {
      return NextResponse.json(
        { error: "Ya existe una cuenta con ese email" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nombre,
        email,
        telefono,
        password: hash,
        rol: rol ?? "inquilino",
      },
    });

    return NextResponse.json(
      { message: "Usuario creado", id: user.id },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}