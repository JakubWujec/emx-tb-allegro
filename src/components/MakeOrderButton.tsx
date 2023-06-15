import { Product } from "../types";
import sendOrder from "../api/sendOrder";

type MakeOrderbuttonProps = {
  products: Product[];
};

const MakeOrderButton = (props: MakeOrderbuttonProps) => {
  const handleButtonClick = async () => {
    const response = await sendOrder(props.products);
  };

  return (
    <button
      onClick={handleButtonClick}
      disabled={!props.products.length}
      className="bg-mainOrange px-4 py-4 mt-4 rounded text-white shadow float-right w-full sm:w-1/2 font-bold"
    >
      Zamów
    </button>
  );
};

export default MakeOrderButton;
