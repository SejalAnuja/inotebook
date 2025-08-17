import React,{useContext} from 'react'
import noteContent from '../context/notes/noteContext';

const NotesItem = (props) => {
    const context = useContext(noteContent);
    const {deleteNote} = context;
    const {note,updateNote} = props
    const handleClick = ()=>{
        deleteNote(note._id);
        props.showAlert("Deleted Successfully","success")
    }
  return (
    <>
    <div className="col-md-3">
    <div class="card my-3">
      <div class="card-body">
      <h5 class="card-title">{note.title}</h5>
      <p class="card-text">{note.description}</p>
      <i class="fa-solid fa-trash mx-2" onClick={handleClick} ></i>
      <i class="fa-solid fa-pen-to-square mx-2"onClick={()=>{updateNote(note); }}></i>
      </div>
    </div>
    </div>
</>
  )
}

export default NotesItem
