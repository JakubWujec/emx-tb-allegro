import AddIcon from "./icons/AddIcon";

interface SummaryPricingProps {
  termoblockIsValid: boolean;
  price: number;
  onClickHandler: any;
}

const SummaryPricing = ({
  termoblockIsValid,
  price,
  onClickHandler,
}: SummaryPricingProps) => {
  if (!termoblockIsValid) {
    return (
      <div className="mt-6">
        <span className="border border-mainOrange block px-6 py-4">
          Wpisz w formularzu parametry, po wpisaniu pojawi się cena produktu
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full mt-6">
      <span className="text-4xl font-bold text-mainOrange">{price} ZŁ</span>
      <button type="submit" onClick={onClickHandler}>
        <AddIcon></AddIcon>
      </button>
    </div>
  );
};

export default SummaryPricing;
