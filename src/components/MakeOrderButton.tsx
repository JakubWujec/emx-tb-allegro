import sendOrder from "../utils/sendOrder";

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  details: any; // TermoblockItem | Formatka | itd..
}

const dumbProducts: Product[] = [
  {
    id: 1,
    name: "TB",
    price: 35.0,
    quantity: 1,
    details: {
      name: "TB",
      width: 500,
      height: 600,
    },
  },
];

const MakeOrderButton = () => {
  const handleButtonClick = async () => {
    const response = await sendOrder(dumbProducts);
    console.log(response);
  };

  return <button onClick={handleButtonClick}>Send</button>;
};

export default MakeOrderButton;
