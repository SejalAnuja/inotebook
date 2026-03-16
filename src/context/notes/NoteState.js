import { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props)=>{
  const host = "https://inotebook-c5u0.onrender.com"
    const [notes,setNotes] = useState([]);
    //get all note
    const getNotes = async()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: "GET",
        headers:{
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        }
      });
      const json = await response.json();
      console.log(json)
      setNotes(json);
    }
    //add note
    const addNote = async (title,description,tag)=>{  
        const response = await fetch(`${host}/api/notes/addnotes`,{
        method: "POST",
        headers:{
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json();
      console.log("Returned from /addnotes:", json);
      if(!json || json.errors || !json._id){
        console.warn("Add note failed:",json.errors || json);
        return;
      }
      setNotes((prevNotes) => [...prevNotes, json]);
      //setNotes(notes.concat(json))
        
    }
    const deleteNote = async (id)=>{
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`,{
        method: "DELETE",
        headers:{
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        });
      const json = await response.json();
      console.log(json)
      const newNote = notes.filter((note)=>{return note._id!==id})
      setNotes(newNote);
    }
    const editNote = async(id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
        method: "PUT",
        headers:{
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      });
      const json = await response.json();
      console.log(json)
      let newNotes = JSON.parse(JSON.stringify(notes))
      for(let i=0;i<notes.length;i++){
        const element = newNotes[i];
        if(element._id === id){
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }
      setNotes(newNotes)
    }
    return(
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )

}

export default NoteState;