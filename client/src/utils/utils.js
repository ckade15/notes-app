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

export const actionReducer = (state, action) => {
    switch(action.type) {
        case "SET_FIRST":
            return {
                ...state,
                firstName: action.payload

            }
        case "SET_LAST":
            return {
                ...state,
                lastName: action.payload
            }
        case "SET_EMAIL":
            return {
                ...state,
                email: action.payload
            }
        case "SET_TOKEN": 
            return {
                ...state,
                sessionToken: action.payload
            }
        case "SET_SIGNED_IN":
            return {
                ...state,
                signedIn: action.payload
            }
    }
}



export default validateClient;