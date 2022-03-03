import { useEffect } from "react";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { updateNote, deleteNote  } from "../utils/utils";

const Note = (props) => {
    const [globalState, setGlobal] = useContext(UserContext);

    const [state, setState] = useState({
        noteId: props.noteId,
        updating: false,
        title: props.title,
        content: props.content,    
    });

    const handleChange = (e) => {
        e.preventDefault();
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const reload = () => {
        window.location.reload();
    }

    const update = async (e) => {
        const note = {
            noteId: props.noteId,
            title: state.title,
            content: state.content,
            email: globalState.email,
        }
        

        const response = await updateNote(globalState.sessionToken, note);
        const success = await response.data.success;
        state.updating = false;
        reload();
        
    };

    useEffect(() => {
    });

    const del = async (e) => {
        e.preventDefault();
        const note = {
            noteId: props.noteId,
            email: globalState.email
        }
        console.log(note);
        state.updating = false;
        const response = await deleteNote(globalState.sessionToken, note).then(response => {
            if (response.data.success){
                reload();
            }
        });
    };

    const handleClick = (e) => {
        e.preventDefault();
        setState({
            ...state,
            updating: !state.updating,
        });   
    };
    if (state.updating) {
        return (
            <div className="bg-blue-200 w-1/2 ml-auto mr-auto p-10 border-2 border-purple-800 flex place-items-center flex-wrap">
                <h1 className="text-blue-900 font-mono text-xl ">{props.num}.</h1>
                <input name="title" value={state.title} onChange={(e) => handleChange(e)} />
                <input name="content" className="text-lg text-green-700 ml-10" value={state.content} onChange={handleChange}/>
                <button className="text-blue-700 font-mono text-lg bg-green-200 p-3 rounded-md ml-6 hover:bg-blue-500 font-bold hover:text-white mt-10" onClick={(e) => {update(e)}}>Update note</button>
                <button className="text-blue-700 font-mono text-lg bg-green-200 p-3 rounded-md ml-6 hover:bg-blue-500 font-bold hover:text-white mt-10" onClick={(e) => {handleClick(e)}}>Exit update mode</button>
                <button className="text-blue-700 font-mono text-lg bg-red-200 p-3 rounded-md ml-6 hover:bg-red-600 hover:text-white font-bold mt-10" onClick={(e) => {del(e)}}>Delete note</button>
            </div>
        )
    }else{
        return (
            <div className="bg-blue-200 w-1/2 ml-auto mr-auto p-10 border-2 border-purple-800 flex place-items-center flex-wrap">
                <h1 className="text-blue-900 font-mono text-xl ">{props.num}. {props.title}</h1>
                <p className="text-lg text-green-700 ml-10">{props.content}</p>
                <button className="text-blue-700 font-mono text-lg bg-green-200 p-3 rounded-md ml-6 hover:bg-blue-500 font-bold hover:text-white" onClick={(e) => {handleClick(e)}}>Enter update mode</button>
                <button className="text-blue-700 font-mono text-lg bg-red-200 p-3 rounded-md ml-6 hover:bg-red-600 hover:text-white font-bold" onClick={(e) => {del(e)}}>Delete note</button>
            </div>
        )

    }

}

export default Note;