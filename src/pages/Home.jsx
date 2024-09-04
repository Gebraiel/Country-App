import { FaCaretDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";

import CountryList from "../components/CountryList";
import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";

function Home() {
  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  console.log("Rendering");
  useEffect(() => {
    setIsLoading(true);
    if (search) {
      const controller = new AbortController();
      const signal = controller.signal;
      axios(`https://restcountries.com/v3.1/name/${search}`, { signal })
        .then((data) => {
          setCountries(data.data);
          setError("");
        })
        .catch((e) => setError(e.message))
        .finally(() => setIsLoading(false));
    } else {
      setCountries(allCountries);
      setIsLoading(false);
      setError("");
    }
  }, [search, allCountries]);

  useEffect(() => {
    setIsLoading(true);
    if (selectedRegion == "all") {
      console.log("All");
      setCountries(allCountries);
      setIsLoading(false);
    } else {
      axios(`https://restcountries.com/v3.1/region/${selectedRegion}`)
        .then((data) => {
          setCountries(data.data);
          setError("");
        })
        .catch((e) => setError(e.message))
        .finally(() => setIsLoading(false));
    }
  }, [selectedRegion, allCountries]);

  useEffect(() => {
    console.log("Getting Data");
    axios("https://restcountries.com/v3.1/all")
      .then((data) => {
        setCountries(data.data);
        setAllCountries(data.data);
        setRegions((regions) => {
          regions = data.data.reduce((acc, next) => {
            if (!acc.includes(next.region)) {
              acc.push(next.region);
            }
            return acc;
          }, []);

          return regions;
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Country App</title>
        <link rel="icon" type="image/svg+xml" href="/earth.png" />
        </Helmet>
      <section>
        <div className="container w-11/12">
          <div className="flex justify-between">
            <div className="py-2 px-5 w-80 bg-white shadow-md shadow-cyan-200 flex justify-start items-center gap-2">
              <button>
                <CiSearch />
              </button>
              <input
                className="w-full focus:outline-none"
                placeholder="Search for a country"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-44 bg-white shadow-md shadow-cyan-200 relative">
              <select
                className="p-3 focus:outline-none appearance-none w-full"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
              >
                <option value="all">All Regions</option>
                {regions.map((region, index) => (
                  <option value={region} key={index}>
                    {region}
                  </option>
                ))}
              </select>
              <FaCaretDown className="absolute right-2 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          {isLoading ? (
            <FaSpinner className="w-10 h-10 m-auto mt-5 animate-spin" />
          ) : error ? (
            <h1>{error}</h1>
          ) : (
            <div className="my-10">
              {countries.length > 0 && <CountryList countries={countries} />}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
