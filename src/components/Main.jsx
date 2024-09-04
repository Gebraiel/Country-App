import { Outlet } from "react-router-dom";

function Main() {
    return ( 
        <main className="pt-5">
            <Outlet />
        </main>
     );
}

export default Main;