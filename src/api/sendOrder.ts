import { Product } from "../types";
import BASE_API_URL from "../url";

async function sendOrder(products: Product[]) {
  const response = await fetch(`${BASE_API_URL}/tbAllegro/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(products),
  });

  console.log(response);
  return response;
}

export default sendOrder;
