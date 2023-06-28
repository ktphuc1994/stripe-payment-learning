'use client';
import { useEffect, useState } from 'react';

// import local library
import { Elements } from '@stripe/react-stripe-js';
import { Stripe, loadStripe } from '@stripe/stripe-js';

// imoprt types and interface
import { InterfaceItem } from '@/types/item';

// import local service
import paymentServ from '@/services/payment.service';

// import local components
import Checkout from '@/Components/Payment/Checkout';

const CheckoutPage = () => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  const item: InterfaceItem = {
    name: 'Macbook Air M1',
    description: 'This is the Macbook Air M1 256Gb',
    image: 'https://picsum.photos/200/300',
    price: 1000,
  };

  useEffect(() => {
    paymentServ.getPublishableKey().then(({ publishableKey }) => {
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    paymentServ.payIntent({ ...item, quantity: 1 }).then((res) => {
      setClientSecret(res.clientSecret);
    });
  }, []);

  console.log({ stripePromise, clientSecret });
  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </>
  );
};

export default CheckoutPage;
