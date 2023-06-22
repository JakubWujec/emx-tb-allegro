import { useContext } from "react";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";
import termoblockToStringParams from "../utils/termoblockToStringParams";
import TrashIcon from "./icons/TrashIcon";

const ProductList = () => {
  const { getItems, removeItem, getSum, changeQuantity } =
    useContext(ShoppingCartContext);

  return (
    <div className="w-full m-auto mt-20">
      <h1 className="font-bold text-2xl text-center mb-5">Koszyk</h1>
      <div>
        <table className="table-fixed w-full bg-white/50  m-auto  divide-y-4 divide-mainOrange max-sm:divide-none rounded-lg">
          <thead>
            <tr className="text-gray-900 max-sm:hidden">
              <HeaderCell className="rounded-tl-lg w-14">Produkt</HeaderCell>
              <HeaderCell className="w-20 md:w-32">Szczegóły</HeaderCell>
              <HeaderCell className="w-20">Cena jednostkowa</HeaderCell>
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
                    <div className="pl-4 text-sm">
                      {termoblockToStringParams(cartItem.details).map(
                        (stringParam) => {
                          return (
                            <div>
                              <span className="font-bold">{`${stringParam.label}: `}</span>
                              {`${stringParam.value}`}
                            </div>
                          );
                        }
                      )}
                    </div>
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

export default ProductList;
