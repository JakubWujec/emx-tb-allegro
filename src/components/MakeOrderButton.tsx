import { Product } from "../types";
import sendOrder from "../utils/sendOrder";

type MakeOrderbuttonProps = {
  products: Product[];
};

const MakeOrderButton = (props: MakeOrderbuttonProps) => {
  const handleButtonClick = async () => {
    const response = await sendOrder(props.products);
    console.log(response);
  };

  return (
    <button onClick={handleButtonClick} disabled={!props.products.length}>
      Zamów
    </button>
  );
};

export default MakeOrderButton;
