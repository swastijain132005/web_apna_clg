import { useSelector } from "react-redux"
import AddForm from "./AddForm"
import { useDispatch } from "react-redux"
import { deleteTodo } from "../features/todo/todoslice"


export default function Todo(){
    const todos = useSelector((state) => state.todos)
    return(
        <>
        <AddForm />
        <h1>Todo List</h1>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}
            <button>Delete</button>
            </li>
          ))}
        </ul>
        </>
    )
}