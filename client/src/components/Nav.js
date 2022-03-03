import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Nav = (props) => {
    const [state, setState] = useContext(UserContext);

    useEffect(() => {

    })

    if (!state.signedIn) {
        

    }

    const handleLog = (e) => {
        e.preventDefault();
        const initialState = {
            firstName: "",
            lastName: "",
            email: "",
            sessionToken: "",
            signedIn: false,
            notes: []
        }
        setState(initialState);
        localStorage.removeItem("sessionToken");

    }

    return (
        
        <nav className="w-full flex justify-end p-4 bg-blue-700 font-mono">
            {!state.signedIn ? 
                <div><a href="/" className="text-white text-2xl font-bold ml-10">Home</a><a href="/login" className="text-white text-2xl font-bold ml-10">Login</a><a href="/register" className="text-white text-2xl font-bold ml-10">Register</a></div>: 
                <div className="flex place-items-center">
                    <p className="text-red-400 mr-20 text-xl font-bold">Hi {state.firstName}</p>
                    <button onClick={handleLog} className="mr-20 bg-red-200 p-3 rounded-md text-blue-800 hover:bg-purple-700 hover:text-white">Log out</button>
                </div>
            }
        </nav>
    )
}

export default Nav;