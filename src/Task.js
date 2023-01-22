import './task.css'
import {useState} from 'react'
import TaskItem from './TaskItem'
import EditTask from './EditTask'
import { doc, updateDoc, deleteDoc} from "firebase/firestore";
import {db} from './firebase'
import { useDispatch } from 'react-redux';
import { removeTask, updateTask } from './features/tasksSlice';

function Task({id, title, description, completed}) {

  const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

   /*Redux-toolkit function to update firestore */
   const dispatch = useDispatch();

   const handleChange = async () => {
     try {
       await updateDoc(doc(db, 'tasks',id), { completed: checked });
       dispatch(updateTask(id, { completed: checked }));
     } catch (err) {
       alert(err);
     }
   };

  //  Redux-toolkit function to delete document from firestore
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      dispatch(removeTask(id));
    } catch (err) {
      alert(err);
    }
  };

  /* function to update firestore */
  // const handleChange = async () => {
  //   const taskDocRef = doc(db, 'tasks', id)
  //   try{
  //     await updateDoc(taskDocRef, {
  //       completed: checked
  //     })
  //   } catch (err) {
  //     alert(err)
  //   }
  // }

  /* function to delete a document from firstore */ 
  // const handleDelete = async () => {
  //   const taskDocRef = doc(db, 'tasks', id)
  //   try{
  //     await deleteDoc(taskDocRef)
  //   } catch (err) {
  //     alert(err)
  //   }
  // }

  return (
    <div className={`task ${checked && 'task--borderColor'}`}>
      <div>
        <input 
          id={`checkbox-${id}`} 
          className='checkbox-custom'
          name="checkbox" 
          checked={checked}
          onChange={handleChange}
          type="checkbox" />
        <label 
          htmlFor={`checkbox-${id}`} 
          className="checkbox-custom-label" 
          onClick={() => setChecked(!checked)} ></label>
      </div>
      <div className='task__body'>
        <h2>{title}</h2>
        <p>{description}</p>
        <div className='task__buttons'>
          <div className='task__deleteNedit'>
            <button 
              className='task__editButton' 
              onClick={() => setOpen({...open, edit : true})}>
              Edit
            </button>
            <button className='task__deleteButton' onClick={handleDelete}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <TaskItem 
          onClose={handleClose} 
          title={title} 
          description={description} 
          open={open.view} />
      }

      {open.edit &&
        <EditTask 
          onClose={handleClose} 
          toEditTitle={title} 
          toEditDescription={description} 
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Task