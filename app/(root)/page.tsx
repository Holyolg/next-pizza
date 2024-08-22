import {
	TopBar,
	Filters,
	Container,
	Title,
} from "../../shared/components/shared";
import { ProductsGroupList } from "../../shared/components/shared/products-group-list";
import { prisma } from "../../prisma/prisma-client";

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					productItem: true,
					ingredients: true,
				},
			},
		},
	});

	return (
		<>
			<Container className="mt-10">
				<Title text="Все пиццы" size="lg" className="font-extrabold" />
			</Container>
			<TopBar
				categories={categories.filter(
					(category) => category.products.length > 0
				)}
			/>

			<Container className="pb-14 mt-10">
				<div className="flex gap-[60px]">
					{/* Фильтрация */}

					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Список товаров */}

					<div className="flex-1">
						<div className="flex flex-col gap-16">
							{categories.map(
								(category) =>
									category.products.length > 0 && (
										<ProductsGroupList
											key={category.id}
											title={category.name}
											products={category.products}
											categoryId={category.id}
										/>
									)
							)}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
