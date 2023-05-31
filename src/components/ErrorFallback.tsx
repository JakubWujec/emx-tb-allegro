import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const handleClick = () => {
    window.location.href = "/";
  };
  console.log(error, Object.keys(error));
  return (
    <div>
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-8">
          <nav className="flex items-center justify-between">
            <div>
              <button onClick={handleClick} className="text-blue-500">
                Home
              </button>
            </div>
            <div>
              <ul className="flex space-x-4">
                <li>
                  <button
                    onClick={() => (window.location.href = "/cart")}
                    className="text-blue-500"
                  >
                    Koszyk
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
      <div className="container mx-auto flex flex-col justify-center items-center">
        <h1 className="mt-36 text-3xl">Coś poszło nie tak !</h1>
        <pre className="my-8 text-red-400">{error.message}</pre>
        <button
          className="border border-mainOrange rounded-lg px-6 py-2 m-4 shadow-lg font-bold text-mainOrange shadow-mainOrange  hover:bg-mainOrange hover:text-white transition transition-300 "
          onClick={resetErrorBoundary}
        >
          Przeładuj
        </button>
        <button
          className="border border-mainOrange rounded-lg px-6 py-2 m-4 shadow-lg font-bold text-mainOrange shadow-mainOrange  hover:bg-mainOrange hover:text-white transition transition-300 "
          onClick={handleClick}
        >
          Powrót do strony głownej
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
