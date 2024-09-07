"use server";

import { prisma } from "@/prisma/prisma-client";
import { PayOrderTemplate } from "@/shared/components";
import { VerificationCodeTemplate } from "@/shared/components/shared/email-templates/verification-code";
import { TCheckoutFormValues } from "@/shared/constants";
import { createPayment, sendEmail } from "@/shared/lib";
import { getUserSession } from "@/shared/lib/get-user-session";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { cookies } from "next/headers";

export async function createOrder(data: TCheckoutFormValues) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }
    //находим корзину пользователя по токену
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItem: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    //если корзина не найдена получаем ошибку
    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart?.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    // создаем заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItem),
      },
    });

    // создаем оплату
    const paymentData = await createPayment({
      amount: order.totalAmount,
      orderId: order.id,
      description: "Оплата заказа #" + order.id,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    //очищаем стоимость корзины
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    //удаляем все продукты из корзины
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    // добавляем id оплаты в заказ
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentData.id,
      },
    });

    const paymentUrl = paymentData.confirmation.confirmation_url;

    // отправляем письмо на оплату
    await sendEmail(
      data.email,
      "Пипца / Оплатите заказ №" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        paymentUrl,
        totalAmount: order.totalAmount,
      })
    );

    return paymentUrl;
  } catch (error) {
    console.log("[CreateOrder] Server error", error);
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не найден");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id),
      },
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : findUser?.password,
      },
    });
  } catch (error) {
    console.error("Error [UPDATE_USER]", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (user) {
      if (!user.verified) {
        throw new Error("почта не подтверждена");
      }
      throw new Error("пользователь уже зарегистрирован");
    }

    const createUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createUser.id,
      },
    });

    await sendEmail(
      createUser.email,
      "Пипца / Подтверждение регистрации",
      VerificationCodeTemplate({
        code,
      })
    );
  } catch (error) {
    console.error("Error [REGISTER_USER]", error);
    throw error;
  }
}
