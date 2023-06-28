'use client';
import React, { useState } from 'react';

// import types and interfaces
import { InterfacePurchaseItem } from '@/types/item';

// import local services
import paymentServ from '@/services/payment.service';

// import local utils
import getStripe from '@/utils/stripe';

// import local components
import ItemComponent from './Items';

// import Material UI components
import Stack from '@mui/material/Stack';
import PaymentComponent from '../Payment';

const ItemList = () => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [item, setItem] = useState<InterfacePurchaseItem>({
    name: 'Apple AirPods',
    description: 'Latest Apple AirPods.',
    image:
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
    price: 999,
    quantity: 1,
  });

  const handleClosePayment = () => {
    setIsPaymentOpen(false);
  };

  const handleBuyItem = async (purchasedItem: InterfacePurchaseItem) => {
    try {
      const stripe = await getStripe();
      if (!stripe) return;
      const checkoutSession = await paymentServ.sessionCheckout(purchasedItem);
      const result = await stripe.redirectToCheckout({
        sessionId: checkoutSession.id,
      });
      if (result.error) {
        alert(result.error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
        return;
      }
      alert('Unknow error');
    }
  };

  const handleBuyItemPopup = async (purchasedItem: InterfacePurchaseItem) => {
    setItem(purchasedItem);
    setIsPaymentOpen(true);
  };

  return (
    <>
      <Stack direction='row' spacing={2} padding='1rem'>
        <ItemComponent item={item} handleBuy={handleBuyItem} />
        <ItemComponent item={item} handleBuy={handleBuyItemPopup} />
      </Stack>
      <PaymentComponent
        open={isPaymentOpen}
        handleClose={handleClosePayment}
        item={item}
      />
    </>
  );
};

export default ItemList;
