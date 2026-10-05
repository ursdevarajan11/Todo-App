import TodoItem from "./TodoItem";

function TodoList({ todos, onDeleteTodo, onEditTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          index={index}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;