import { createContext, useReducer } from "react";

export const UserContext = createContext({
    firstName: "Chris",
    lastName: "",
    email: "",
    sessionToken: "",
    signedIn: false,
});

/*
export const UserReducer = (state, action) => {
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
        default:
            return state;
    }
}*/

export const UserProvider = ({children}) => {
    //const [state, dispatch] = useReducer(UserReducer, UserContext);

    return (
        <UserContext.Provider value={UserContext}>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer;

export default UserContext;