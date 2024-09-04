import { IoMoonOutline } from "react-icons/io5";

function Header() {
    function handleClick(){

    }
    return ( 
        <header className="py-5 bg-white shadow-md shadow-cyan-100">
            <div className="container w-11/12">
                <div className="flex justify-between flex-wrap">
                    <div className="font-bold text-lg"><h1>Where in the world ?</h1></div>
                    <button className="flex items-center gap-2" onClick={()=>handleClick()}>
                        <IoMoonOutline />
                        Dark Mode
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;