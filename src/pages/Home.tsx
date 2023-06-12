import { Link } from "react-router-dom";
import ConfiguratorPro from "./ConfiguratorPro";

const Home = () => {
  return (
    <div className="relative">
      <div>
        <Link className="text-black-500" to={`/up`}>
          UP
        </Link>
      </div>
      <div>
        <Link className="text-black-500" to={`/go`}>
          GO
        </Link>
      </div>
      <div>
        <Link className="text-black-500" to={`/pro`}>
          PRO
        </Link>
      </div>
    </div>
  );
};

export default Home;
