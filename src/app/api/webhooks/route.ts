// STRIPE_WEBHOOK_SECRET

import db from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    console.log("webhook error", error);
    return new NextResponse(`Webhook error:${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  const userId = session?.metadata?.userId;
  const courseId = session?.metadata?.courseId;

  if (event.type === "checkout.session.completed") {
    if (!userId || !courseId) {
      return new NextResponse("WebHOok Error: Missing metada", { status: 400 });
    }

    await db.purchase.create({
      data: {
        courseId,
        userId,
      },
    });
  } else {
    return new NextResponse(
      "WebHOok Error: Unhandled event Type" + event.type,
      { status: 200 }
    );
  }

  return new NextResponse(null, { status: 200 });
}
