"use server";

import { prisma } from "@/prisma/prisma-client";
import { TCheckoutFormValues } from "@/shared/constants";
import { OrderStatus } from "@prisma/client";

export async function createOrder(data: TCheckoutFormValues) {
  console.log(data);

  const token = "1234";

  await prisma.order.create({
    data: {
      fullName: data.firstName + " " + data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      comment: data.comment,
      token: token,
      totalAmount: 1500,
      status: OrderStatus.PENDING,
      items: [],
    },
  });
}
