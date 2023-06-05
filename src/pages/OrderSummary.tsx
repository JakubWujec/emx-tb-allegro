export default function OrderSummary() {
  return (
    <div className="min-h-screen mt-20 w-full m-auto">
      <h1 className="font-bold text-2xl">Dziękujemy za złożenie zamówienia</h1>
      <div className="mt-4 mb-4 px-2 py-2 divide-y-4 divide-mainOrange">
        <div className="grid grid-cols-3 max-sm:grid-cols-1 justify-center py-4 px-3">
          <p className="font-bold">Termoblock UP</p>
          <p className="font-bold text-mainOrange">KWOTA zł (ILOŚĆ szt.)</p>
          <p>
            W aukcji -{" "}
            <span className="font-bold text-mainOrange">
              ILOŚĆ SZT. produktu
            </span>
          </p>
        </div>
        <div className="grid grid-cols-3 max-sm:grid-cols-1 justify-center py-4 px-3">
          <p className="font-bold">Termoblock PRO</p>
          <p className="font-bold text-mainOrange">KWOTA zł (ILOŚĆ szt.)</p>
          <p>
            W aukcji -{" "}
            <span className="font-bold text-mainOrange">
              ILOŚĆ SZT. produktu
            </span>
          </p>
        </div>
      </div>
      <div>
        <p className="font-bold leading-5">Produkty zostały zapisane</p>
        <p className="leading-8">
          Wróć na Allegro i dokonaj zakupu w wiadomości dla sprzedającego podaj
          numer zamówienia:{" "}
          <span className="font-bold text-mainOrange">NUMER</span>
        </p>
        <p className="leading-7">
          Łączna kwota zamówienia:{" "}
          <span className="font-bold text-mainOrange">KWOTA</span>
        </p>
      </div>
    </div>
  );
}
