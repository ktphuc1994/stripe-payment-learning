import { InterfaceItem, InterfacePurchaseItem } from '@/types/item';

interface InterfaceItemComponent {
  item: InterfaceItem;
  handleBuy: (item: InterfacePurchaseItem) => void;
}
