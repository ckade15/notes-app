import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Note = (props) => {

    return (
        <div className="bg-blue-200 w-1/2 ml-auto mr-auto p-10 border-2 border-purple-800 flex place-items-center flex-wrap">
            <h1 className="text-blue-900 font-mono text-xl ">{props.num}. {props.title}</h1>
            <p className="text-lg text-green-700 ml-10">{props.content}</p>
            <a href="#" className="text-blue-700 font-mono text-lg bg-red-200 p-3 rounded-md ml-4">Update note</a>
        </div>
    )
}

export default Note;