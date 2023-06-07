import useShoppingCart from "../hooks/useShoppingCart";

const ProductList = () => {
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();

  return (
    <div className="w-full m-auto mt-20">
      <h1 className="font-bold text-2xl text-center mb-5">Koszyk</h1>
      <div>
        <table className="table-fixed w-full bg-white/50  m-auto  divide-y-4 divide-mainOrange max-sm:divide-none rounded-lg">
          <thead>
            <tr className="text-gray-900 max-sm:hidden">
              <HeaderCell className="rounded-tl-lg w-20">Produkt</HeaderCell>
              <HeaderCell className="w-20">Nazwa</HeaderCell>
              <HeaderCell className="w-20 md:w-32">Cena jednostkowa</HeaderCell>
              <HeaderCell className="w-20">Ilość</HeaderCell>
              <HeaderCell className="w-14">Cena</HeaderCell>
              <HeaderCell className="px-5 w-2 rounded-tr-lg"></HeaderCell>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-mainOrange">
            {getItems().map((cartItem, index) => {
              return (
                <tr
                  className="max-sm:grid max-sm:grid-flow-col max-sm:grid-cols-12 max-sm:justify-items-center"
                  key={index}
                >
                  <Cell className="max-sm:col-start-1 max-sm:col-end-5">
                    <span>{cartItem.name}</span>
                  </Cell>
                  <Cell className="max-sm:hidden">
                    <span>{cartItem.name}</span>
                  </Cell>
                  <Cell className="max-sm:hidden">{cartItem.price} zł</Cell>
                  <Cell className="max-sm:col-start-5 max-sm:col-end-9">
                    <button
                      className="bg-white text-gray-700 font-bold py-1 px-2 rounded-l"
                      onClick={() => changeQuantity(cartItem, 1, "subtract")}
                    >
                      -
                    </button>
                    <input
                      className="bg-orange-50 form-input w-16 text-center py-1 px-2 focus:outline-none"
                      value={cartItem.quantity}
                      onChange={(e) =>
                        changeQuantity(
                          cartItem,
                          parseInt(e.target.value),
                          "change"
                        )
                      }
                    />
                    <button
                      className="bg-white text-gray-700 font-bold py-1 px-2 rounded-r"
                      onClick={() => changeQuantity(cartItem, 1, "add")}
                    >
                      +
                    </button>
                  </Cell>
                  <Cell className="max-sm:col-start-9 max-sm:col-end-12">
                    {getSum(cartItem)} zł
                  </Cell>
                  <Cell className="w-2 max-sm:col-start-12 max-sm:col-end-12">
                    <button
                      className="hover:text-red-500 hover:scale-110 transition-all"
                      onClick={() => removeItem(cartItem)}
                    >
                      <TrashIcon />
                    </button>
                  </Cell>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between w-full md:w-1/2 ml-auto bg-white py-5 px-5 mt-5 rounded-md shadow">
        <span>Do zapłaty:</span>
        <span className="font-bold">{getSum()} zł</span>
      </div>
    </div>
  );
};

const Cell: React.FC<{
  children?: React.ReactNode | null;
  className?: string;
}> = ({ children, className }) => (
  <td className={" py-8 box-border " + (className || "")}>
    <div className="flex items-center justify-center">{children}</div>
  </td>
);

const HeaderCell: React.FC<{
  children?: React.ReactNode | null;
  className?: string;
}> = ({ children, className }) => (
  <th className={" py-5 " + (className || "")}>{children}</th>
);

const TrashIcon = () => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="stroke-1 w-6"
  >
    <path
      strokeLinejoin="round"
      strokeLinecap="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    ></path>
  </svg>
);

export default ProductList;
