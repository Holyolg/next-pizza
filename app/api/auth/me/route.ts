import { getUserSession } from "@/shared/lib/get-user-session";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: any, res: any) {
	try {
		const user = await getUserSession();

		if (!user) {
			return NextResponse.json(
				{ message: "Вы не авторизованы" },
				{ status: 401 }
			);
		}

		const data = await prisma.user.findFirst({
			where: {
				id: Number(user.id),
			},
			select: {
				fullName: true,
				email: true,
				password: false,
			},
		});

		return NextResponse.json(data);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ message: "[USER_GET] server error" },
			{ status: 400 }
		);
	}
}
