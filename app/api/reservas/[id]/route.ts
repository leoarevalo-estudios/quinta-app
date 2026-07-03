import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth();

        if (!session) {
            return NextResponse.json(
                { error: "Tenés que iniciar sesión" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const { estado } = await req.json();

        const reserva = await prisma.reserva.update({
            where: { id: parseInt(id) },
            data: { estado },
            include: {
                quinta: true,
            },
        });

        // Notificar al inquilino si se confirmó o canceló
        if (estado === "confirmada" || estado === "cancelada") {
            await prisma.notificacion.create({
                data: {
                    usuarioId: reserva.usuarioId,
                    mensaje:
                        estado === "confirmada"
                            ? `Tu reserva en ${reserva.quinta.nombre} fue confirmada`
                            : `Tu reserva en ${reserva.quinta.nombre} fue cancelada`,
                },
            });
        }

        return NextResponse.json(reserva);
    } catch (error) {
        return NextResponse.json(
            { error: "Error al actualizar reserva" },
            { status: 500 }
        );
    }
}