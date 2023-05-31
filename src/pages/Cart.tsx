import React from "react";
import { TermoblockItemColor } from "../enums";
import useShoppingCart from "../hooks/useShoppingCart";

const Cart = () => {
  //const { cartItems, removeItem, addItem } = useContext(ShoppingCartContext);
  const [getItems, addItem, removeItem, getSum, changeQuantity] =
    useShoppingCart();
  return (
    <>
      <div>Koszyk</div>
      <table className="table-auto w-full max-w-5xl my-0 mx-auto bg-white border border-collapse ">
        <thead>
          <tr className="border">
            <HeaderCell>Produkt</HeaderCell>
            <HeaderCell>Nazwa</HeaderCell>
            <HeaderCell>Cena jednostkowa</HeaderCell>
            <HeaderCell>Ilość</HeaderCell>
            <HeaderCell>Cena</HeaderCell>
            <HeaderCell>Usuń</HeaderCell>
          </tr>
        </thead>
        <tbody>
          {getItems().map((cartItem, index) => {
            return (
              <tr className="border" key={index}>
                <Cell>
                  <span>{cartItem.name}</span>
                </Cell>
                <Cell>
                  <span>{cartItem.name}</span>
                </Cell>
                <Cell>{cartItem.price} zł</Cell>
                <Cell>
                  <button
                    className="bg-gray-100 text-gray-700 font-bold py-1 px-2 rounded-l"
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
                    className="bg-gray-100 text-gray-700 font-bold py-1 px-2 rounded-r"
                    onClick={() => changeQuantity(cartItem, 1, "add")}
                  >
                    +
                  </button>
                </Cell>
                <Cell>{getSum(cartItem)} zł</Cell>
                <Cell>
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
      <button
        onClick={() =>
          addItem({
            id: 1,
            name: "Termoblock",
            price: 12,
            quantity: 1,
            details: {
              width: 111,
              height: 222,
              color: TermoblockItemColor.WHITE,
              felc: 12,
            },
          })
        }
      >
        Dodaj testowo
      </button>
      <div>Suma: {getSum(null)}</div>
    </>
  );
};

const Cell: React.FC<{
  children?: React.ReactNode | null;
  className?: string;
}> = ({ children, className }) => (
  <td className={"border py-8" + (className || "")}>
    <div className="flex items-center justify-center">{children}</div>
  </td>
);

const HeaderCell: React.FC<{
  children?: React.ReactNode | null;
  className?: string;
}> = ({ children, className }) => (
  <th className={"border py-5 " + (className || "")}>{children}</th>
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

export default Cart;
