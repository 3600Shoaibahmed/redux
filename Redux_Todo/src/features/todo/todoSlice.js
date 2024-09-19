import { createSlice , nanoid} from "@reduxjs/toolkit";


const initialState ={
    todos :[ { id:'shaoib' , task:'demo_redux' , isDone : false}],
}


 export const todoSlice=createSlice({
    name:"todo",
    initialState,
    reducers:{// state, action
        addTodo :(state,action) =>{
            const newTodo = {
                id:nanoid(),
                task:action.payload,
                isDone:false,
            };
            state.todos.push(newTodo);

        },

        deleteTodo:(state,action) =>{
            //action.payload
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            
        },
        markAsDone:(state,action) =>{
            //action.payload
            state.todos=state.todos.map(()=>{
                if(todo.id === action.payload){
                    todo.isDone =true;
                }
            })


        }
    }
 });

 export const { addTodo,deleteTodo,markAsDone} = todoSlice.actions;
 export default todoSlice.reducer;