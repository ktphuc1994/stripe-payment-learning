import { FormEvent, useState } from 'react';

// import local library
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';

// import MUI components
import Button from '@mui/material/Button';

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submit');
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occured.');
      }
      setIsProcessing(false);
      return;
    }
    setMessage('');
    setIsProcessing(false);
  };

  return (
    <form id='payment-form' onSubmit={handleSubmit}>
      <PaymentElement id='payment-element' />
      <Button
        disabled={isProcessing || !stripe || !elements}
        type='submit'
        id='submit'
        variant='contained'
        fullWidth
        sx={{ mt: '0.5rem' }}
      >
        <span id='button-text'>
          {isProcessing ? 'Processing ... ' : 'Pay now'}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <div id='payment-message'>{message}</div>}
    </form>
  );
};

export default Checkout;
