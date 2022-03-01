import { createContext, useState } from "react";

export const UserContext = createContext();

const initialState = {
    firstName: "Chris",
    lastName: "",
    email: "",
    sessionToken: "",
    signedIn: false,
}


export const UserProvider = ({children}) => {
    const [state, setState] = useState(initialState);
    const setFirstName = (firstName) => {
        setState({
            ...state,
            firstName: firstName
        });
    };
    const setLastName = (lastName) => {
        setState({
            ...state,
            lastName: lastName
        });
    };
    const setEmail = (email) => {
        setState({
            ...state,
            email: email
        });
    };
    const setSessionToken = (sessionToken) => {
        setState({
            ...state,
            sessionToken: sessionToken
        })
    }

    return (
        <UserContext.Provider value={
            {
                firstName: "Chris",
                lastName: "",
                email: "",
                sessionToken: "",
                signedIn: false,
                setFirstName,
                setLastName,
                setEmail,
                setSessionToken
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer;

export default UserContext;