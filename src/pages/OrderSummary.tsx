import { useParams } from "react-router-dom";
import BASE_API_URL from "../url";
import useFetch from "../hooks/useFetch";
import { Product } from "../types";

export default function OrderSummary() {
  const { orderId } = useParams();

  const { data, error } = useFetch<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    idAllegro: number;
    loginAllegro: string;
    products: Product[];
    fullPrice: number;
  }>(`${BASE_API_URL}/tbAllegro/orders/${orderId}`);

  if (!data) return null;

  return (
    <div className="min-h-screen mt-20 w-full m-auto">
      <h1 className="font-bold text-2xl">Dziękujemy za złożenie zamówienia</h1>

      <div className="mt-4 mb-4 px-2 py-2 divide-y-4 divide-mainOrange">
        {data.products.map((product) => {
          return (
            <div className="grid grid-cols-3 max-sm:grid-cols-1 justify-center py-4 px-3">
              <p className="font-bold">{product.name}</p>
              <p className="font-bold text-mainOrange">
                {product.price} zł ({product.quantity} szt.)
              </p>
              <p>
                W aukcji -{" "}
                <span className="font-bold text-mainOrange">
                  {product.quantity}. produktu
                </span>
              </p>
            </div>
          );
        })}
      </div>
      <div>
        <p className="font-bold leading-5">Produkty zostały zapisane</p>
        <p className="leading-8">
          Wróć na Allegro i dokonaj zakupu w wiadomości dla sprzedającego podaj
          numer zamówienia:{" "}
          <span className="font-bold text-mainOrange">{`${data.idAllegro}`}</span>
        </p>
        <p className="leading-7">
          Łączna kwota zamówienia:{" "}
          <span className="font-bold text-mainOrange">{data.fullPrice} ZŁ</span>
        </p>
      </div>
    </div>
  );
}