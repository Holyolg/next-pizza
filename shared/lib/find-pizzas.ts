import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
	query?: string;
	sort?: string;
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

const DEFAULT_POPULAR_SORT = "desc";

export const findPizzas = async (params: GetSearchParams) => {
	const sizes = params.sizes?.split(",").map(Number);
	const pizzaTypes = params.pizzaTypes?.split(",").map(Number);
	const ingredientsIdArr = params.ingredients?.split(",").map(Number);

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE;
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE;

	const sort = params.sort || DEFAULT_POPULAR_SORT;
	console.log(sort);

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: sort === "desc" ? "desc" : "asc",
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
						  }
						: undefined,
					productItem: {
						some: {
							size: {
								in: sizes,
							},
							pizzaType: {
								in: pizzaTypes,
							},
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
					},
				},

				include: {
					productItem: {
						where: {
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
						orderBy: {
							price: "asc",
						},
					},
					ingredients: true,
				},
			},
		},
	});

	return categories;
};
