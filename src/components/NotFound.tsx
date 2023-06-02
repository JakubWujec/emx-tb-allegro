import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[80vh] w-full flex  flex-col justify-center items-center">
      <h1 className="m-6">Strona nie została znaleziona</h1>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-4 border rounded bg-mainOrange text-white text-xl hover:bg-mainOrangeDarker transition"
      >
        Powrót do strony głównej
      </button>
    </div>
  );
};

export default NotFound;
