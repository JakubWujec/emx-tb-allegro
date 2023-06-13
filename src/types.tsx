import { TermoblockHole } from "./schema/termoblockHole.schema";
import { CreateTermoblockUpItemInput } from "./schema/termoblockUp.schema";
import { CreateTermoblockProItemInput } from "./schema/termoblockPro.schema";
import { CreateTermoblockGoItemInput } from "./schema/termoblockGo.schema";
interface Product {
  id: number;
  price: number;
  quantity: number;
  details: TermoblockItem;
  productTypeId: number;
}

type TermoblockItem =
  | CreateTermoblockUpItemInput
  | CreateTermoblockProItemInput
  | CreateTermoblockGoItemInput;

type FirstHoleType = Record<"firstHole", TermoblockHole>;
type SecondHoleType = Record<"secondHole", TermoblockHole>;
type ThirdHoleType = Record<"thirdHole", TermoblockHole>;

type StringParam = {
  label: string;
  value: string;
};

export type {
  StringParam,
  TermoblockItem,
  Product,
  TermoblockHole,
  FirstHoleType,
  SecondHoleType,
  ThirdHoleType,
  CreateTermoblockUpItemInput,
  CreateTermoblockProItemInput,
  CreateTermoblockGoItemInput,
};
