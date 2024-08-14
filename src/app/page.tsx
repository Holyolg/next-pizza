import { Container, Filters, Title } from "./shared";
import { TopBar } from "./shared/top-bar";

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
							{/* <ProductsGroupList title="Пиццы" items={[1, 2, 3, 4, 5]} />
							<ProductsGroupList title="Комбо" items={[1, 2, 3, 4, 5]} /> */}
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
