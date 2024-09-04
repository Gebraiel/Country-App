import { useState } from "react";
import Country from "./Country"

function Chunck({chunck,handleClick,isLastPatch}) {
    const[hidden,setHidden] = useState(isLastPatch);
  return (
    <>
        <div
        className="grid gap-10 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 justify-center items-center"
        >
        {
            chunck?.map((country) => (
                <Country country={country} key={country.name.common} />
            ))
        }
        </div>
        <button className={`${hidden ? 'hidden':'block'} m-auto my-5 rounded font-medium bg-white shadow-md shadow-cyan-300 p-3`} onClick={()=>{
            setHidden(true);
            handleClick();
        }}> Show More </button>

    </>
  );
}

export default Chunck;
