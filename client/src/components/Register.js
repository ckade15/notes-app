import { React, useState, useEffect } from "react";
import axios from "axios";
import Nav from "./Nav";
import {GrFormViewHide, GrFormView} from 'react-icons/gr';
import { Navigate } from "react-router-dom";
import RegisterMessage from "./RegisterMessage";
import validateClient from "../utils/utils";

const Register = (props) => {
    const localhost = "http://localhost:5001/api/register";
    const lenovohost = "http://192.168.1.115:5001/api/register";
    const registerRoute = localhost;

    const [state, setState] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        errors: [],
        hideP: true,
        hideC: true,
        registered: false,
        valid: false
    });

    useEffect(() => {
        /*try{
            if (validateClient(state.firstName, state.lastName, state.email, state.password, state.confirmPassword)) {
                setState({ ...state, valid: true });
            }
        } catch (err) {
            console.log(err);
        }*/
    });
    const handlePass = (e) => {
        e.preventDefault();
        if (e.target.name === "p") {
            setState({ ...state, hideP: !state.hideP });
        }else if (e.target.name === "c") {
            setState({ ...state, hideC: !state.hideC });
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });

    };

    const validatePassword = () => {
        if (state.password !== state.confirmPassword && state.password.length > 4 && state.confirmPassword.length > 4) {
            return "Passwords do not match";
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                firstName: state.firstName,
                lastName: state.lastName,
                email: state.email,
                password: state.password
            })
        }
        const response = await axios.post(registerRoute, {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            password: state.password
        });
        const data = await response.json();
        //console.log(data.error);
        if (data.error) {
            setState({
                ...state,
                errors: data.error
            });
        }else if (data.success) {
            setState({
                errors: [],
                registered: true
            });
        }
    };
    const grPf = <div value={false} name="p" onClick={handlePass} ><GrFormViewHide size={40}></GrFormViewHide></div>;
    const grPt = <div value={true} name="c" onClick={handlePass} ><GrFormView size={40}></GrFormView></div>;

    return (
        <div className="w-full min-h-screen bg-gray-300 ">
            {state.registered ? <Navigate to="/register/success" /> : 

                <div className="font-mono w-full min-h-screen bg-gray-300 pb-10">
                    <Nav />
                    <h1 className="text-center text-2xl p-6 text-blue-800 font-bold">Create Account</h1>
                    <form className="flex flex-col w-2/3 ml-auto mr-auto text-xl text-gray-700 bg-blue-200 p-20 border-2 border-blue-800 " onSubmit={(e) => {
                            if (validateClient(state.firstName, state.lastName, state.email, state.password, state.confirmPassword)) {
                                handleSubmit(e);
                            }else{
                                e.preventDefault();
                            }
                        }}>
                        <div className="flex justify-evenly place-items-center">
                            <label className="w-1/5">First Name:</label>
                            <input type="text" name="firstName" value={state.firstName} onChange={handleChange} className="border-2 border-red-200 p-2 mt-2 w-1/2"/>
                        </div>

                        <div className="flex justify-evenly place-items-center mt-8">
                            <label className="mt-4 w-1/5">Last Name:</label>
                            <input type="text" name="lastName" value={state.lastName} onChange={handleChange} className="border-2 border-red-200 p-2 mt-2 w-1/2"/> 
                        </div>
                        <div className="flex justify-evenly place-items-center mt-8">
                            <label className="mt-4 w-1/5">Email:</label>
                            <input type="text" name="email" value={state.email} onChange={handleChange} className="border-2 border-red-200 p-2 mt-2 w-1/2"/>
                        </div>
                        <div className="flex justify-evenly place-items-center mt-8">
                            <label className="mt-4 w-1/5">Password:</label>
                            <input type="password" name="password" value={state.password} onChange={handleChange} className="border-2 border-red-200 p-2 mt-2 w-1/2"/>  
                            {state.hideP ? grPf : grPt}
                        </div>
                        <div className="flex justify-evenly place-items-center mt-8">
                            <label className="mt-4 w-1/5">Re-enter Password:</label>
                            <input id="confirmPassword" type="password" name="confirmPassword" value={state.confirmPassword} onChange={handleChange} className="border-2 border-red-200 p-2 mt-2 w-1/2"/>
                            {state.hideC ? grPf : grPt}
                        </div>
                        {!validatePassword() ? <></> : <p className="text-center mt-2 text-red-500 ">{"* "+validatePassword()}</p>}
                        <button className="mt-10 bg-blue-500 text-white p-4 rounded-lg w-1/3 ml-auto mr-auto hover:text-blue-500 hover:bg-white" type="submit" >Register Account</button>
                        {state.errors.length > 0 && <div className="mt-4 text-blue-700 text-center">{state.errors.map(error => <p className="mt-2">{ "* " + error}</p>)}</div>}
                    </form>

                </div>
            } 
        </div>
    );
}

export default Register;