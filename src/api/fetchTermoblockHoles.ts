import BASE_API_URL from "../url";

export const fetchTermoblockHoles = async () => {
  const response = await fetch(
    `${BASE_API_URL}/tbAllegro/termoblockHoleProducts`
  );
  const data = await response.json();
  if (!response.ok) {
    console.log("ERROR: ", data.message || "Bład podczas pobierania danych");
    return;
  }
  return data as {
    id: number;
    name: string;
    termoblockHoleTypeId: number;
  }[];
};
