import { Link } from "react-router-dom";

function Country({ country }) {
  // console.log(country);
  const {
    name: { common },
    region,
    population,
    flags: { svg: image },
  } = country;
  return (
    <Link
      to={`country-details/${common}`}
      className="country rounded-md bg-white shadow-md"
    >
      <div
        style={{ backgroundImage: `url(${image})` }}
        className={`rounded-t-md w-full h-40 bg-cover bg-no-repeat bg-center`}
      ></div>
      <div className="p-6  pb-10">
        <h2 className="mb-1 font-bold text-lg">{common}</h2>
        <p className="font-semibold">
          Population:{" "}
          <span className="opacity-80 font-normal">{population}</span>{" "}
        </p>
        <p className="font-semibold">
          Region: <span className="opacity-80 font-normal">{region}</span>
        </p>
        <p className="font-semibold">
          Capital:{" "}
          <span className="opacity-80 font-normal">
            {country.capital ? country.capital[0] : "No Capital"}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default Country;
