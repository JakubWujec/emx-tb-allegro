interface SubmitWithPricingProps {
  disabled: boolean;
  price: number;
}

const SubmitWithPricing = ({ disabled, price }: SubmitWithPricingProps) => {
  if (disabled) {
    return (
      <div className="mt-6">
        <span className="border border-mainOrange block px-6 py-4 text-primary">
          Wpisz w formularzu parametry, po wpisaniu pojawi się cena produktu
        </span>
      </div>
    );
  }

  return (
    <div className="m-4 w-full text-center justify-center flex basis-1/4">
      <div className="flex items-center justify-center w-full mt-6 gap-2">
        <span className="text-4xl font-bold text-mainOrange">{price} ZŁ</span>
        <button
          type="submit"
          className="bg-mainOrange hover:bg-mainOrangeDarker text-white p-4 rounded-md"
        >
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default SubmitWithPricing;
