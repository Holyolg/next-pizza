import { Container, Filters, Title } from "../components/shared";
import { ProductsGroupList } from "../components/shared/products-group-list";
import { TopBar } from "../components/shared/top-bar";

export default function Home() {
	return (
		<>
			<Container className="mt-10">
				<Title text="Все пиццы" size="lg" className="font-extrabold" />
			</Container>
			<TopBar />

			<Container className="pb-14 mt-10">
				<div className="flex gap-[60px]">
					{/* Фильтрация */}
					<div className="w-[250px]">
						<Filters />
					</div>

					{/* Список товаров */}

					<div className="flex-1">
						<div className="flex flex-col gap-16">
							<ProductsGroupList
								title="Пиццы"
								categoryId={1}
								products={[
									{
										id: 1,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 2,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 3,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 4,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 5,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
								]}
							/>
							<ProductsGroupList
								title="Комбо"
								categoryId={2}
								products={[
									{
										id: 1,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 2,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 3,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 4,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
									{
										id: 5,
										name: "Чизбургер пицца",
										imageUrl:
											"https://media.dodostatic.net/image/r:233x233/11EE7D612FC7B7FCA5BE822752BEE1E5.avif",
										price: 550,
										items: [{ price: 550 }],
									},
								]}
							/>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
