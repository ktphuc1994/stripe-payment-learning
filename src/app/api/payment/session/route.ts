import { NextResponse } from 'next/server';

// import types and interfaces
import { InterfacePurchaseItem } from '@/types/item';

// import and config stripe
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
  try {
    const item: InterfacePurchaseItem = await req.json();
    const transformedItem: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    };

    const session = await stripe.checkout.sessions.create({
      line_items: [transformedItem],
      mode: 'payment',
      success_url: 'http://localhost:3000/payment/success',
      cancel_url: 'http://localhost:3000/payment/failed',
      metadata: {
        images: item.image,
      },
    });

    return NextResponse.json({ id: session.id });
  } catch (e) {
    let message = 'Unknown error';
    let statusCode = 400;
    if (e instanceof Stripe.errors.StripeError) {
      message = e.message;
      statusCode = e.statusCode ?? 400;
    }
    return new Response(message, { status: statusCode });
  }
}
