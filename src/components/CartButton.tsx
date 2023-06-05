import React from "react";
import CartIcon from "./icons/CartIcon";

const CartButton: React.FC<{
  quantity: number;
}> = ({ quantity }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative">
        {!!quantity && (
          <div className="bottom-[12px] absolute left-[16px]">
            <p className="flex h-2 w-2 items-center justify-center rounded-full bg-mainOrange p-2 text-[10px] text-white font-bold">
              {quantity}
            </p>
            <span className="animate-ping absolute h-full w-full rounded-full bg-mainOrange opacity-60 top-0 right-0"></span>
          </div>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export default CartButton;
