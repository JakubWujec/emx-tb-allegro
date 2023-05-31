import { TermoblockItemColor } from "./enums";

interface TermoblockItem {
  width: number;
  height: number;
  color: TermoblockItemColor;
  felc: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  details: TermoblockItem;
}

export type { TermoblockItem, Product };
