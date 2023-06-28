import { InterfacePurchaseItem } from '@/types/item';
import https from './https';

const paymentServ = {
  getPublishableKey: async (): Promise<{ publishableKey: string }> => {
    const res = await https('/api/payment/config');
    if (!res.ok) {
      throw new Error('Failed to fetch Publishable Key');
    }

    return res.json();
  },

  payIntent: async (
    item: InterfacePurchaseItem
  ): Promise<{ clientSecret: string }> => {
    const res = await https('/api/payment/payment-intent', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      console.log(res.body);
      throw new Error('Failed to post Payment Intent');
    }

    return res.json();
  },

  sessionCheckout: async (
    item: InterfacePurchaseItem
  ): Promise<{ id: string }> => {
    const res = await https('/api/payment/session', {
      method: 'POST',
      body: JSON.stringify(item),
    });
    if (!res.ok) {
      console.log(res.body);
      throw new Error('Failed to post Session Checkout');
    }
    return res.json();
  },
};

export default paymentServ;
