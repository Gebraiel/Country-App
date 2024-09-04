import axios from "axios";
import 'leaflet/dist/leaflet.css';

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function CountryDetails() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios(`https://restcountries.com/v3.1/name/${name}`).then((data) =>
      setCountry(data.data[0])
    );
  }, [name]);
  return country != null ? (
    <>
      <Helmet>
        <title>{country.name.common}</title>
        <link rel="icon" type="image/svg+xml" href={country.flags.svg} />
      </Helmet>
      <MapContainer className="w-full h-80" center={country.latlng} zoom={13} scrollWheelZoom={true}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={country.latlng}>
            <Popup>
                <img src={country.flags.svg} alt="country flag" className="inline-block w-5"/> {country.name.common}
            </Popup>
            </Marker>
    </MapContainer>
      <div className="container w-11/12 my-5">
        <button
          onClick={() => navigate(-1)}
          className="bg-white shadow-md shadow-cyan-300 py-2 px-5 rounded-md mb-5 flex items-center gap-1"
        >
          <FaLongArrowAltLeft /> Back
        </button>
        <div className="flex justify-start gap-20 flex-wrap">
          <div className="w-6/12">
            <img src={country.flags.svg} />
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-bold text-2xl">{country.name.common}</h1>
            <div className="flex flex-col flex-grow justify-around">
              <div className="flex flex-col gap-2">
                <p>
                  <b>Population:</b> {country?.population}
                </p>
                <p>
                  <b>Region:</b> {country?.region}
                </p>
                <p>
                  <b>Capital:</b> {country?.population}
                </p>
                <p>
                  <b>Top Level Domain:</b> {country?.tld[0]}
                </p>
              </div>
              <a
                href={country.maps.googleMaps}
                target="_blank"
                className="bg-white shadow-md shadow-cyan-300 py-2 text-center rounded-md font-"
              >
                Show Map
              </a>
            </div>
          </div>
        </div>
      </div>
       
    </>
  ) : (
    <h1 className="text-center">Getting Country Data</h1>
  );
}

export default CountryDetails;
