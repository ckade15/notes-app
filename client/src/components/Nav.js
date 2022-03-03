import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Nav = (props) => {
    const [state, setState] = useContext(UserContext);

    useEffect(() => {

    })

    if (!state.signedIn) {
        

    }


    return (
        
        <nav className="w-full flex justify-end p-4 bg-blue-700 font-mono">
            {!state.signedIn ? 
                <div><a href="/" className="text-white text-2xl font-bold ml-10">Home</a><a href="/login" className="text-white text-2xl font-bold ml-10">Login</a><a href="/register" className="text-white text-2xl font-bold ml-10">Register</a></div>: 
                <div><p className="text-red-400 mr-20 text-xl">Hi {state.firstName}</p></div>
            }
        </nav>
    )
}

export default Nav;