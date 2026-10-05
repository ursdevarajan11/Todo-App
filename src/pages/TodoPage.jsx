import { useState } from "react";
import TodoInput from "../components/todo/TodoInput";
import TodoList from "../components/todo/TodoList";

function TodoPage() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Read Blog",
      updateCount: 0,
    },
    {
      id: 2,
      title: "Read JavaScript",
      updateCount: 0,
    },
  ]);

  // ADD
  const addTodo = (title) => {
  const newTodo = {
    id: crypto.randomUUID(),
    title: title,
    updateCount: 0,
  };

  setTodos((currentTodos) => [...currentTodos, newTodo]);
};

  // DELETE
  const deleteTodo = (id) => {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  };

  // EDIT + COUNTER
  const editTodo = (id, newTitle) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: newTitle,
            updateCount: todo.updateCount + 1,
          };
        }

        return todo;
      })
    );
  };

  return (
    <main className="todo-page">
      <section className="todo-container">
        <h1>What's the Plan for Today?</h1>

        <TodoInput onAddTodo={addTodo} />

        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />
      </section>
    </main>
  );
}

export default TodoPage;