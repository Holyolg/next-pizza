import { NextRequest, NextResponse } from "next/server";
import { findOrCreateCart } from "../../../shared/lib/find-or-create-cart";
import { updateCartTotalAmount } from "../../../shared/lib/update-cart-total-amount";
import { CreateCartItemValues } from "../../../shared/services/dto/cart-dto";
import { prisma } from "./../../../prisma/prisma-client";
export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get("cartToken")?.value;

		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] });
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						token,
					},
				],
			},

			include: {
				cartItem: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						productItem: {
							include: {
								product: true,
							},
						},
						ingredients: true,
					},
				},
			},
		});

		return NextResponse.json(userCart);
	} catch (error) {
		console.log("[CART_GET] server error", error);
		return NextResponse.json(
			{ error: "Не удалось получить корзину" },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get("cartToken")?.value;

		if (!token) {
			token = crypto.randomUUID();
		}

		const userCart = await findOrCreateCart(token);

		const data = (await req.json()) as CreateCartItemValues;

		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productItemId: data.productItemId,
				AND: [
					{
						ingredients: {
							every: {
								id: {
									in: data.ingredients,
								},
							},
						},
					},
					{
						ingredients: {
							none: {
								id: {
									notIn: data.ingredients,
								},
							},
						},
					},
				],
			},
		});

		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			});
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productItemId: data.productItemId,
					quantity: 1,
					ingredients: {
						connect: data.ingredients?.map(id => ({
							id,
						})),
					},
				},
			});
		}

		const updateUserCart = await updateCartTotalAmount(token);

		const response = NextResponse.json(updateUserCart);
		response.cookies.set("cartToken", token);
		return response;
	} catch (error) {
		console.log("[CART_POST] server error", error);
		return NextResponse.json(
			{ error: "Не удалось создать корзину" },
			{ status: 500 }
		);
	}
}
