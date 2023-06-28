import { InterfacePurchaseItem } from '@/types/item';

export interface InterfacePaymentComponent {
  open: boolean;
  handleClose: () => void;
  item: InterfacePurchaseItem;
}
