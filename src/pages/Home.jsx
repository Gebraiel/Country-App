import { FaCaretDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { FaSpinner } from "react-icons/fa";
import CountryList from "../components/Country/CountryList";
import { useEffect, useState } from "react";
import axios from "axios";
function Home() {
  /*Home States Start */

  const [allCountries, setAllCountries] = useState([]);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [showedCountries, setShowedCountries] = useState(8);

  /*Home States End */

  /* Use Effects Start*/

  useEffect(() => {
    setIsLoading(true);
    if (search) {
      const controller = new AbortController();
      const signal = controller.signal;
      setShowedCountries(8);
      axios(`https://restcountries.com/v3.1/name/${search}`, { signal })
        .then((data) => {
          setCountries(data.data);
          setError("");
        })
        .catch((e) => setError(e.status))
        .finally(() => setIsLoading(false));
    } else {
      setCountries(allCountries);
      setIsLoading(false);
      setError("");
    }
  }, [search, allCountries]);

  useEffect(() => {
    axios("https://restcountries.com/v3.1/all")
      .then((data) => {
        setCountries(data.data);
        setAllCountries(data.data);
        setShowedCountries(8);
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

  /* Use Effects End*/
  return (
    <>
      <section>
        <div className="container w-11/12">
          <div className="flex justify-between flex-wrap gap-10">
            <div className="py-2 px-5 w-80 bg-white dark:bg-[#2b3743] dark:shadow-[#1f2c35] dark:text-white shadow-md shadow-cyan-200 flex justify-start items-center gap-2">
              <button>
                <CiSearch />
              </button>
              <input
                className="w-full bg-transparent focus:outline-none"
                placeholder="Search for a country"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-44 bg-white dark:bg-[#2b3743] dark:shadow-[#1f2c35] dark:text-white shadow-md shadow-cyan-200 relative">
              <select
                className="p-3 focus:outline-none appearance-none w-full dark:bg-[#2b3743] "
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
            <FaSpinner className="w-10 h-10 m-auto mt-5 animate-spin dark:text-white" />
          ) : error ? (
            <h1 className="text-center text-red-500 mt-5">
              Sorry Couldn't Find This Country
            </h1>
          ) : (
            <>
              <div className="my-10">
                {countries.length > 0 && (
                  <CountryList
                    countries={countries
                      .filter(
                        (country) =>
                          country.region == selectedRegion ||
                          selectedRegion == "all"
                      )
                      .slice(0, showedCountries)}
                  />
                )}
              </div>
              <button
                className={`${
                  showedCountries >= countries.length ? "hidden" : "block"
                } m-auto my-5 rounded font-medium dark:bg-[#2b3743] dark:shadow-[#1f2c35] dark:text-white bg-white shadow-md shadow-cyan-300 p-3`}
                onClick={() => setShowedCountries(showedCountries + 8)}
              >
                {" "}
                Show More{" "}
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default Home;
