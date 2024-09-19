import React from 'react'
import { useSelector } from 'react-redux'
import AddForm from './AddForm';

export default function Todo() {
    const todos = useSelector((state) => state.todos);
    console.log(todos);

  return (
    <div>
      <h2>WELCOME TO TO_DO'S TASKS</h2>
      <AddForm />
      <ol>
        {
            todos.map((todo)=>(
                <li key={todo.id}>{todo.task}</li>
            ))
        }
      </ol>
    </div>
  )
}
