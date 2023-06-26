import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';
import CheckoutPage from './payment/page';

type HomeComponent = {
  pulishableKey: string;
};

export const getServerSideProps: GetServerSideProps<{
  homeProps: HomeComponent;
}> = async () => {
  const res = await fetch('/api/payment/config');
  const homeProps = await res.json();
  return { props: { homeProps } };
};

export default function Home({
  homeProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const stripePromise = useMemo(
    () => loadStripe(homeProps.pulishableKey),
    [homeProps.pulishableKey]
  );

  return (
    <>
      <main>Public key: {homeProps.pulishableKey}</main>
      <Elements stripe={stripePromise}>
        <CheckoutPage />
      </Elements>
    </>
  );
}
