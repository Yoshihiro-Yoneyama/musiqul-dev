// Todoアプリの中身
import TodoList from "@/app/task1/components/todo-list";

const TodoTask = () => {
  return (
    <div className="container">
      <h1 className="title">Todo App</h1>
      <TodoList />
    </div>
  );
};

export default TodoTask;