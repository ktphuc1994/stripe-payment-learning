import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useMemo } from 'react';
import CheckoutPage from './payment/page';
import https from '@/services/https';

type HomeComponent = {
  publishableKey: string;
};

export const getServerSideProps: GetServerSideProps<{
  homeProps: HomeComponent;
}> = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const homeProps = await res.json();
  return { props: { homeProps } };
};

export default function Home({
  homeProps,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log({ homeProps });
  // const stripePromise = useMemo(
  //   () => loadStripe(homeProps.publishableKey),
  //   [homeProps.publishableKey]
  // );

  return (
    <>
      {/* <main>Public key: {homeProps.publishableKey}</main> */}
      {/* <Elements stripe={stripePromise}> */}
      <CheckoutPage />
      {/* </Elements> */}
    </>
  );
}
