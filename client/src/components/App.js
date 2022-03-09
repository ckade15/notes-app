import Nav from "./Nav";
import {UserContext} from "../context/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { checkToken, addNote } from "../utils/utils";
import Note from "./Note";
import AddNote from "./AddNote";
import Footer from "./Footer";

function App() {
    const [state, setState] = useContext(UserContext);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });
    useEffect(() => {
        if (localStorage.getItem("sessionToken")) {
            checkToke();
        }
    }, []);

    // Determines if token is valid
    const checkToke = async () => {
        const response = await checkToken(localStorage.getItem("sessionToken"));

        const success = await response.data.success;

        if (success) {
            setState({
                ...state,
                signedIn: true,
                sessionToken: response.data.sessionToken,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                notes: response.data.notes,
                foot: false
            });
        }else{
            setState({
                ...state,
                signedIn: false,
                foot: true,
            });
        }

    };



  return (
    <div className="bg-gray-200 w-full min-h-screen ">
        <Nav />
        {!state.signedIn ? <div className="min-h-screen"><p className="text-blue-800 font-mono text-center mt-20 text-3xl font-bold ">Please sign in or register to manage your notes.</p></div> : 
            <div className="flex flex-col justify-center min-h-screen">
                <h3 className="text-center mt-10 text-2xl font-mono text-blue-900">{state.firstName}'s Notes</h3>
                <AddNote />
                {state.notes.length > 0 ? state.notes.map((note, index) => {
                    index++;
                    return <Note noteId={note._id} num={index} title={note.title} content={note.content} />
                }) : <p className="text-blue-800 font-mono text-center mt-10 text-2x">No notes to display</p>}

            </div>
        }
        {state.foot ? <Footer dis="fixed" /> : <Footer dis=""/>}
    </div>
  );
}

export default App;
