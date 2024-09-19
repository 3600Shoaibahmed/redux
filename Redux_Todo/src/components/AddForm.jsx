import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addTodo } from '../features/todo/todoSlice';

export default function AddForm() {

    const dispatch =useDispatch();

    const [task,setTask] =useState("");
    const submitHandler=(evt) =>{
        evt.preventDefault();
        console.log(task);
        dispatch(addTodo(task));
        

    }
  return (
    <div>
        <form onSubmit={submitHandler}>
            <input type='text' onChange={(e) => setTask(e.target.value)}></input>
            <button>Add Task</button>

        </form>
      
    </div>
  )
}
