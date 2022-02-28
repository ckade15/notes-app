import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Nav = (props) => {
    const name = useContext(UserContext);
    console.log(name['firstName']);

    return (
        <nav className="w-full flex justify-end p-4 bg-blue-700 font-mono">
            <h1>Hi {name.firstName}</h1>
            <a href="/" className="text-white text-2xl font-bold ml-10">Home</a>
            <a href="/login" className="text-white text-2xl font-bold ml-10">Login</a>
            <a href="/register" className="text-white text-2xl font-bold ml-10">Register</a>
        </nav>
    )
}

export default Nav;