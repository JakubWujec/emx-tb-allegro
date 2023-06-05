import { CreateTermoblockItemInput as TermoblockItem } from "./schema/termoblockItem.schema";
import { TermoblockHole } from "./schema/termoblockHole.schema";
import { CreateTermoblockUpItemInput } from "./schema/termoblockUp.schema";
import { CreateTermoblockProItemInput } from "./schema/termoblockPro.schema";
import { CreateTermoblockGoItemInput } from "./schema/termoblockGo.schema";
interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  details:
    | TermoblockItem
    | CreateTermoblockUpItemInput
    | CreateTermoblockProItemInput
    | CreateTermoblockGoItemInput;
}

type FirstHoleType = Pick<TermoblockItem, "firstHole">;
type SecondHoleType = Pick<TermoblockItem, "secondHole">;

export type {
  TermoblockItem,
  Product,
  TermoblockHole,
  FirstHoleType,
  SecondHoleType,
};
