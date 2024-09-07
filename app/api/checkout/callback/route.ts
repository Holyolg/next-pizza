import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { OrderCanceledTemplate, OrderSuccessTemplate } from "@/shared/components";
import { sendEmail } from "@/shared/lib";
import { CartItemDTO } from "@/shared/services/dto/cart-dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // получили запрос от юкассы
    const body = (await req.json()) as PaymentCallbackData;

    // поиск заказа по id
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    // обновляем статус

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELED,
      },
    });

    const items = JSON.parse(order?.items as string) as CartItemDTO[];

    // отправка письма
    if (isSucceeded) {
      await sendEmail(
        order.email,
        `Пипца / Заказ №${order.id} успешно оформлен`,
        OrderSuccessTemplate({ orderId: order.id, items: items, totalAmount: order.totalAmount })
      );
    } else {
      await sendEmail(
        order.email,
        `Пипца / Заказ №${order.id} отменен`,
        OrderCanceledTemplate({ orderId: order.id, items: items, totalAmount: order.totalAmount })
      );
    }
  } catch (error) {
    console.log("[Checkout Callback] Error", error);
    return NextResponse.json({ error: "Error" }, { status: 500 });
  }
}
