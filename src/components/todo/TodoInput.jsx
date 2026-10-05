import { useState } from "react";

function TodoInput({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const value = inputValue.trim();

    if (!value) {
      return;
    }

    // Check whether the input ends with a number
    const match = value.match(/^(.*?)(?:\s+(\d+))$/);

    if (match) {
      const title = match[1].trim();
      const quantity = Number(match[2]);

      if (!title || quantity <= 0) {
        return;
      }

      // Create the same todo multiple times
      for (let i = 0; i < quantity; i++) {
        onAddTodo(title);
      }
    } else {
      // Normal todo
      onAddTodo(value);
    }

    setInputValue("");
  };

  return (
    <form className="todo-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a todo"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />

      <button type="submit">
        Add Todo
      </button>
    </form>
  );
}

export default TodoInput;