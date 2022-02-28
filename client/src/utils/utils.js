import axios from "axios";
import { useReducer } from "react";

const validateClient = (firstName, lastName, email, password, passVerify) => {
    if (firstName === "") {
        return false;
    }
    if (lastName === "") {
        return false;
    }
    if (email === "") {
        return false;
    }
    if (password === "") {
        return false;
    }
    if (passVerify === "") {
        return false;
    }
    if (password !== passVerify) {
        return false;
    }
    return true;
}

export const signIn = async (email, password) => {
    const loginRoute = "http://localhost:5001/api/signin";
    //console.log(state.email, state.password);
    const response = await axios.post(loginRoute, {
        email: email,
        password: password
    });
    return response;
};



export default validateClient;