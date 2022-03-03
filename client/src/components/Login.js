import axios from "axios";
import {useState} from "react";
import { Navigate } from "react-router-dom";
import Nav from "./Nav";
import { signIn } from "../utils/utils";
import {UserContext} from "../context/UserContext";
import { useContext } from "react";
import Footer from "./Footer";

function Login() {
    const [st, setSt] = useContext(UserContext);

    const [state, setState] = useState({
        email: "",
        password: "",
        error: "",
        signedIn: false
    });

    const handleChange = (e) => {
        const value = e.target.value;
        
        setState({
            ...state,
            [e.target.name]: value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signIn(state.email, state.password);

        const err = await response.data.error;
        const success = await response.data.success;
        
        if (success) {
            localStorage.setItem("sessionToken", response.data.sessionToken);
            
            setSt({
                ...st,
                signedIn: true,
                sessionToken: response.data.sessionToken,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email

            });
            setState({
                ...state,
                signedIn: true
            });
            Navigate("/");
        }
        
        if (err.length > 0) {
            setState({
                ...state,
                error: err,
                signedIn: false
            });
        }
    };

    return (
      <div className="w-full min-h-screen bg-gray-200">
            {state.signedIn ? <Navigate to="/" /> : 
                <div className="w-full min-h-screen bg-gray-200">
                    <Nav />
                    <h1 className="text-center text-2xl font-mono mt-4 text-blue-800 font-bold">Login</h1>
                    <form className="flex flex-col w-2/3 ml-auto mr-auto text-xl text-gray-700 bg-blue-200 p-20 border-2 border-blue-800 mt-4" onSubmit={(e) => {handleSubmit(e)}}>
                            <div className="flex flex-col w-2/3 ml-auto mr-auto">
                                <label className="text-gray-700 font-mono text-xl">Email:</label>
                                <input type="text" name="email" className="border-2 border-red-200 p-2 mt-2 w-full" onChange={handleChange}/>
                                <label className="text-gray-700 text-xl font-mono mt-8">Password:</label>
                                <input type="password" name="password" className="border-2 border-red-200 p-2 mt-2 w-full" onChange={handleChange}/>
                                <button className="mt-10 bg-blue-500 text-white p-4 rounded-lg w-1/3 ml-auto mr-auto hover:text-blue-500 hover:bg-white" type="submit" >Login</button>
                                {state.error.length > 0 ? <p className="text-red-500 text-xl font-mono mt-8">* {state.error}</p> : <></>}
                            </div>
                    </form>
                    <Footer />
                </div>
            }
      </div>
    );
  }
  
  export default Login;