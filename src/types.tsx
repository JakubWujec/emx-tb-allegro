import { TermoblockItemColor } from "./enums";

interface TermoblockItem {
  id: number;
  price: number;
  quantity: number;
  width: number;
  height: number;
  color: TermoblockItemColor;
  felc: number;
}

export type { TermoblockItem };
