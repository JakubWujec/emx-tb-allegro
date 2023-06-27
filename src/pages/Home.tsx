import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      <div>
        <Link className="text-primary" to={`/up`}>
          UP
        </Link>
      </div>
      <div>
        <Link className="text-primary" to={`/go`}>
          GO
        </Link>
      </div>
      <div>
        <Link className="text-primary" to={`/pro`}>
          PRO
        </Link>
      </div>
    </div>
  );
};

export default Home;
