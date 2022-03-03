import { createContext, useState } from "react";

export const UserContext = createContext();

const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    sessionToken: "",
    signedIn: false,
    notes: []
}


export const UserProvider = ({children}) => {
    const [state, setState] = useState(initialState);



    return (
        <UserContext.Provider value={[state, setState]}>
            {children}
        </UserContext.Provider>
    )
}

export const UserConsumer = UserContext.Consumer;

export default UserContext;