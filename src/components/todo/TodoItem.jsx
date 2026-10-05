import { useState } from "react";

function TodoItem({ todo, index, onDeleteTodo, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);

  const handleEditClick = () => {
    setEditValue(todo.title);
    setIsEditing(true);
  };

  const handleSave = () => {
    const newTitle = editValue.trim();

    if (newTitle === "") {
      return;
    }

    onEditTodo(todo.id, newTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.title);
    setIsEditing(false);
  };

  return (
    <article
      className={`todo-item ${
        index % 2 === 0 ? "todo-blue" : "todo-orange"
      }`}
    >
      {isEditing ? (
        <div className="todo-edit-box">
          <input
            type="text"
            value={editValue}
            onChange={(event) => setEditValue(event.target.value)}
          />

          <button type="button" onClick={handleSave}>
            ✓
          </button>

          <button type="button" onClick={handleCancel}>
            ✕
          </button>
        </div>
      ) : (
        <>
          <span>
            {todo.title}{" "}
            <span className="update-text">
              (Updated {todo.updateCount}{" "}
              {todo.updateCount === 1 ? "time" : "times"})
            </span>
          </span>

          <div className="todo-actions">
            <button
              type="button"
              onClick={() => onDeleteTodo(todo.id)}
              aria-label="Delete Todo"
            >
              🗑
            </button>

            <button
              type="button"
              onClick={handleEditClick}
              aria-label="Edit Todo"
            >
              ✎
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default TodoItem;