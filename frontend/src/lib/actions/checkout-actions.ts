"use server";

import Stripe from "stripe";
import { cookies } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function checkoutCredits({
  priceId,
  customerEmail,
  userId,
}: {
  priceId: string;
  customerEmail: string;
  userId: string;
}): Promise<{ url: string } | null> {
  let customerId: string;

  try {
    const existingCustomers = await stripe.customers.list({
      email: customerEmail,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const newCustomer = await stripe.customers.create({
        email: customerEmail,
        metadata: { userId },
      });
      customerId = newCustomer.id;
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard/canceled`,
      billing_address_collection: "required",
      client_reference_id: userId,
      payment_method_types: ["card"],
      allow_promotion_codes: true,
      metadata: {
        userId,
      },
    });

    console.log("Checkout session URL:", session.url);

    if (session.url) {
      const cookieStore = await cookies();
      cookieStore.set("stripe_session_id", session.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, 
      });

      // Return the URL to the client
      return { url: session.url };
    } else {
      throw new Error("Failed to create checkout session");
    }
  } catch (error) {
    console.error("Stripe checkout error:", error);
    throw new Error("An error occurred during checkout. Please try again.");
  }
}