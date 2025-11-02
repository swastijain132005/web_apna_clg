import { createSlice,nanoid } from '@reduxjs/toolkit';


const initialStates={
    todos:[{id:1, title:"Learn Redux", completed:false}]
};

export const todoSlice = createSlice({
    name:"todo",
    initialStates,
    reducers:{
        addTodo:(state, action)=>{
            const newTodo={id:nanoid(), title:action.payload, completed:false};
            state.todos.push(newTodo);//direct mutation allowed in redux toolkit
        },
        deleteTodo:(state, action)=>{
            state.todos=state.todos.filter(todo=>todo.id !== action.payload);
        },
        markasCompleted:(state, action)=>{
            const todo=state.todos.find(todo=>todo.id === action.payload);
            if(todo){
                todo.completed=true;
            }
        }
    }
});


export const {addTodo, deleteTodo, markasCompleted}=todoSlice.actions;
export default todoSlice.reducer;
