import React, {useContext, useState} from 'react'
import noteContent from '../context/notes/noteContext';
const AddNote = (props) => {
    const context = useContext(noteContent);
    const {addNote} = context;
    const [note, setNotes] = useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        if (note.title.length < 3 || note.description.length < 5) {
    props.showAlert("Title must be at least 3 chars & description at least 5.", "danger");
    return;
  }
        addNote(note.title,note.description,note.tag);
        setNotes({title:"",description:"",tag:""})
        props.showAlert("Added Succesfully","success");
    }
    const onChange = (e)=>{
        setNotes({...note,[e.target.name]: e.target.value})
    }
  return (
    <div className="container my-3">
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp"onChange={onChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name="description" value={note.description}  onChange={onChange}/>
          </div>
          <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
        
      </div>
  )
}

export default AddNote
