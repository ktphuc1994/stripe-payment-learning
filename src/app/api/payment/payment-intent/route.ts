import { NextResponse } from 'next/server';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRECT_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(request: Request) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: 'usd',
      amount: 50,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
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
