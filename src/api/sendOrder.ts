import { Product } from "../types";
import BASE_API_URL from "../url";

async function sendOrder(data: { products: Product[]; login: string }) {
  const response = await fetch(`${BASE_API_URL}/tbAllegro/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const responseJson = await response.json();

  return responseJson;
}

export default sendOrder;
