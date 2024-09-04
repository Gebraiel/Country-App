import { useState } from "react";
import Chunck from "./Chunck";
function CountryList({ countries }) {
    const[chuncks] = useState(()=>{
        
        let res = []
        for (let i = 0; i < countries.length; i += 9) {
            res.push(countries.slice(i, i + 9));
        }
        return res;
    });
    const[renderedChuncks,setRenderedChuncks] = useState([chuncks[0]]);
    const[patchNum,setPatchNum] = useState(2);
    function getMore(){
        setRenderedChuncks(chuncks.slice(0,patchNum));
        setPatchNum(patchNum + 1);
    }
    return (
        renderedChuncks.map((chunck,index)=><Chunck chunck={chunck} handleClick={getMore} isLastPatch={patchNum > chuncks.length}key={index}/>)
        // countries.map((country,index)=><Country country={country} key={index} />)
    )
  
}

export default CountryList;
