export interface InterfaceItem {
  name: string;
  description: string;
  image: string;
  price: number;
}

export interface InterfacePurchaseItem extends InterfaceItem {
  quantity: number;
}
