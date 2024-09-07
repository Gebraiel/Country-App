import Country from "./Country";
function CountryList({ countries }) {
  return (
    <div className="grid gap-10 grid-cols-1 md:grid-cols-4 sm:grid-cols-2">
      {countries.length > 0 ? (
        countries.map((country, index) => (
          <Country country={country} key={index} />
        ))
      ) : (
        <h1 className="text-center text-red-500">No Country Found</h1>
      )}
    </div>
  );
}

export default CountryList;
