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

export const checkToken = async (sessionToken) => {
    const checkRoute = "http://localhost:5001/api/checkToken";
    const response = await axios.post(checkRoute, {
        sessionToken: sessionToken
    });
    return response;
};

export const addNote = async (sessionToken, note) => {
    const addRoute = "http://localhost:5001/api/note";
    const response = await axios.post(addRoute, {
        sessionToken: sessionToken,
        email: note.email,
        title: note.title,
        content: note.content
    });
    return response;
}
export const updateNote = async (sessionToken, note) => {
    const updateRoute = "http://localhost:5001/api/updatenote";
    const response = await axios.post(updateRoute, {
        "noteId": note.noteId,
        "sessionToken": sessionToken,
        "email": note.email,
        "title": note.title,
        "content": note.content
    });
    return response;
}
export const deleteNote = async (sessionToken, note) => {
    const deleteRoute = "http://localhost:5001/api/updatenote";
    const response = await axios.delete(deleteRoute, {data:{
        "noteId": note.noteId,
        "sessionToken": sessionToken,
        "email": note.email,
    }});
    return response;
}



export default validateClient;