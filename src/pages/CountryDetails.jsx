import axios from "axios";
import "leaflet/dist/leaflet.css";
import { FaSpinner } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

function CountryDetails() {
  /*Country Details States Start */

  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();
  /*Country Details States End */

  /*Use Effects Start */

  useEffect(() => {
    axios(`https://restcountries.com/v3.1/name/${name}`).then((data) =>
      setCountry(data.data[0])
    );
  }, [name]);

  /*Use Effects End */
  return country != null ? (
    <>
      <Helmet>
        <title>{country.name.common}</title>
        <link rel="icon" type="image/svg+xml" href={country.flags.svg} />
      </Helmet>
      <MapContainer
        className="w-full h-80"
        center={country.latlng}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={country.latlng} icon={
          L.icon({
            iconUrl: markerIcon,
            shadowUrl: markerShadow,
          })
        }
        >
          <Popup>
            <img
              src={country.flags.svg}
              alt="country flag"
            />          
          </Popup>
        </Marker>
      </MapContainer>
      <div className="container w-11/12 my-5">
        <div className="flex flex-col lg:flex-row justify-start gap-20">
          <div className="w-full max-w-[500px] m-auto">
            <img src={country.flags.svg} />
          </div>
          <div className="dark:text-white flex flex-grow flex-col gap-5">
            <h1 className="font-bold text-2xl">{country.name.common}</h1>
            <div className="flex gap-10 flex-col sm:flex-row sm:gap-40">
              <div className="flex flex-col gap-2">
                <p>
                  <b>Official Name:</b> {country?.name.official}
                </p>
                <p>
                  <b>Population:</b> {country?.population}
                </p>
                <p>
                  <b>Region:</b> {country?.region}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <p>
                  <b>Capital:</b> {country.capital}
                </p>
                <p>
                  <b>Top Level Domain:</b> {country.tld[0]}
                </p>
                <p>
                  <b>Currencies: </b>{" "}
                  {country.cuurencies
                    ? Object.values(country.currencies).map((entry, index) => (
                        <span key={index}>{entry.name}</span>
                      ))
                    : "No Currencies"}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-fit dark:bg-[#2b3743] dark:shadow-[#1f2c35] dark:text-white bg-white shadow-md shadow-cyan-300 py-2 px-5 rounded-md mb-5 flex items-center gap-1"
            >
              <FaLongArrowAltLeft /> Back
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <FaSpinner className="w-10 h-10 m-auto mt-5 animate-spin dark:text-white" />
  );
}

export default CountryDetails;
