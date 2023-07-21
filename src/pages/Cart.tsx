import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import sendOrder from "../api/sendOrder";
import ProductList from "../components/ProductList";
import { InputField } from "../components/formFields/InputField";
import { NotificationContext } from "../hooks/useNotificationsProvider";
import { CartFormInput, CartSchema } from "../schema/cart.schema";
import { ShoppingCartContext } from "../hooks/useShoppingCartProvider";

const Cart = () => {
  const { getItems, clearCart } = useContext(ShoppingCartContext);
  const products = getItems();
  const formMethods = useForm<CartFormInput>({
    resolver: CartSchema && zodResolver(CartSchema),
  });
  const navigate = useNavigate();
  const { addNotification } = useContext(NotificationContext);

  const onSubmit = async (values: CartFormInput) => {
    const response = await sendOrder({
      login: values.login,
      products: products,
    });
    if (response.status === 400) {
      addNotification({
        title: "Error",
        message: response.message,
        type: "error",
      });
    } else {
      clearCart();
      return navigate(`/summary/${response.order.id}`);
    }
  };

  if (!products.length) {
    return <EmptyCart></EmptyCart>;
  }

  return (
    <>
      <ProductList />
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <div className="flex justify-between w-full md:w-1/2 ml-auto bg-white py-5 px-5 mt-5 rounded-md shadow">
          <InputField
            label="Login allegro"
            type="text"
            registration={formMethods.register("login")}
          ></InputField>
        </div>

        <button
          type="submit"
          disabled={!products.length}
          className="bg-mainOrange px-4 py-4 mt-4 rounded text-white shadow float-right w-full sm:w-1/2 font-bold"
        >
          Zapisz
        </button>
      </form>
    </>
  );
};

const EmptyCart = () => {
  return (
    <h1 className="text-center font-semibold text-2xl mt-56">
      Brak towarów w koszyku
    </h1>
  );
};

export default Cart;
