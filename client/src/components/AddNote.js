
import {UserContext} from "../context/UserContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { checkToken, addNote } from "../utils/utils";
import Note from "./Note";

const AddNote = (props) => {
    const [state, setState] = useContext(UserContext);
    const [note, setNote] = useState({
        title: "",
        content: ""
    });

    const handleChange = (e) => {
        e.preventDefault();
        setNote({
            ...note,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const nt = {
            title: note.title,
            content: note.content,
            email: state.email
        }
        addNote(localStorage.getItem("sessionToken"), nt).then(response => {
            console.log(response);
            if (response.data.success) {
                setState({
                    ...state,
                    note: [...response.data.note]
                });
                console.log("Note added");
            }else{
                console.log(response.data.error)
            }
        });
    }


    return (
        <form className="w-1/3 ml-auto mr-auto p-4 flex justify-center flex-col " onSubmit={(e) => handleSubmit(e)}>
            <p className="text-xl text-red-500 font-bold font-mono">Add a new note:</p>
            <input type="text" name="title" placeholder="Title" className="w-full p-2 border-2 border-blue-700 mt-4" onChange={handleChange} />
            <textarea name="content" placeholder="Content" className="w-full p-2 border-2 border-blue-700 mt-4" onChange={handleChange}/>
            <button type="submit" name="addNote" value="Add note" className="ml-auto mr-auto mt-4 bg-blue-200 p-4 rounded-md w-1/3 hover:bg-green-200 hover:text-blue-900 text-lg font-bold font-mono" >Add note</button>
        </form>
    )
}

export default AddNote;