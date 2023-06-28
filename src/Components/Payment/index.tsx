'use client';
import { useEffect, useState } from 'react';

// import local library
import { Elements } from '@stripe/react-stripe-js';
import { Stripe, loadStripe } from '@stripe/stripe-js';

// imoprt types and interface
import { InterfacePaymentComponent } from './types';

// import local service
import paymentServ from '@/services/payment.service';

// import local components
import Checkout from '@/Components/Payment/Checkout';

// import MUI Components
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const PaymentComponent = ({
  item,
  open,
  handleClose,
}: InterfacePaymentComponent) => {
  const [stripePromise, setStripePromise] =
    useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    paymentServ.getPublishableKey().then(({ publishableKey }) => {
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    paymentServ.payIntent(item).then((res) => {
      setClientSecret(res.clientSecret);
    });
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
        React Stripe and the Payment Element
      </DialogTitle>
      <DialogContent>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <Checkout />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentComponent;
