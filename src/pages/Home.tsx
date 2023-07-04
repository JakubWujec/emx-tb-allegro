import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative">
      <div className="flex flex-wrap flex-row gap-2">
        <ProductWrapper
          imgSrc="../../public/pol_pm_Rama-okienna-Warmtec-TermoBlock-UP-2109_4.webp"
          name="Rama okienna Warmtec Termoblock Up"
          link="/up"
        ></ProductWrapper>
        <ProductWrapper
          imgSrc="../../public/pol_pm_Rama-okienna-Warmtec-TermoBlock-GO-2110_1.webp"
          name="Rama okienna Warmtec Termoblock Go"
          link="/go"
        ></ProductWrapper>
        <ProductWrapper
          imgSrc="./../public/pol_pm_Rama-okienna-Warmtec-TermoBlock-PRO-2122_1.webp"
          name="Rama okienna Warmtec Termoblock Pro"
          link="/pro"
        ></ProductWrapper>
      </div>
    </div>
  );
};

const ProductWrapper = ({
  name,
  imgSrc,
  link,
}: {
  name: string;
  imgSrc: string;
  link: string;
}) => {
  return (
    <div className="rounded-md shadow-lg">
      <picture>
        <img alt={name} src={imgSrc}></img>
      </picture>
      <p>
        <Link
          className="text-primary hover:text-mainOrange min-h-[24px]"
          to={link}
        >
          {name}
        </Link>
      </p>
    </div>
  );
};

export default Home;
