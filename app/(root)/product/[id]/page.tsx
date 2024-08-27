import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/prisma-client";
import {
	Container,
	PizzaImage,
	Title,
} from "../../../../shared/components/shared";
import { GroupVariants } from "../../../../shared/components/shared/group-variants";

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string };
}) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } });

	if (!product) {
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10">
			<div className="flex flex-1">
				<PizzaImage imageUrl={product.imageUrl} alt={product.name} size={30} />
				<div className="w-[490px] bg-gray-100/30 p-7">
					<Title
						text={product.name}
						size="md"
						className="font-extrabold mb-1"
					/>
					<p className="text-gray-400">
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
						consequuntur dolorem asperiores vel soluta! Atque error dolorem enim
						illum. Minus voluptatum veniam ipsam cumque, nulla ut quo quia
						libero animi.
					</p>

					<GroupVariants
						value={"2"}
						items={[
							{
								name: "маленькая",
								value: "1",
							},
							{
								name: "средняя",
								value: "2",
							},
							{
								name: "большая",
								value: "3",
								disabled: true,
							},
						]}
					/>
				</div>
			</div>
		</Container>
	);
}
