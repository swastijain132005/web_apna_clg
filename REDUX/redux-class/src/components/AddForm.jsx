import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoslice";

export default function AddForm() {
    const dispatch=useDispatch();
  const [title, setTitle] = useState("");
  const [isValid, setIsValid] = useState(false);
  dispatch(addTodo(title));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" disabled={!isValid}>
        Add
      </button>
    </form>
  );
}