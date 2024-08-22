import { Ingredient, Product, ProductItem } from "@prisma/client";

export type ProductWithRelations = Product & {
	productItem: ProductItem[];
	ingredients: Ingredient[];
};
