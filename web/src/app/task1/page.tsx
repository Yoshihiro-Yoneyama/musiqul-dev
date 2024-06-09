// Todoアプリの中身
import TodoList from "@/app/task1/components/todo-list";
import styles from './task.module.scss';

const TodoTask = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo App</h1>
      <TodoList />
    </div>
  );
};

export default TodoTask;