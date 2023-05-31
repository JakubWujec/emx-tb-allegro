import { CreateTermoblockItemInput as TermoblockItem } from "./schema/termoblockItem.schema";

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  details: TermoblockItem;
}

export type { TermoblockItem, Product };
