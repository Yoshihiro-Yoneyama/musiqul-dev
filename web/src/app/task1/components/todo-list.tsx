"use client"

import React, {useState} from "react";
import TodoItem from "@/app/task1/components/todo-item";

const TodoList = () => {
  // タスクと新しいタスク入力を管理するためのstate
  const [tasks, setTasks] = useState<Array<{ task: string; completed: boolean}>>([]);
  const [newTask, setNewTask] = useState('');

  // タスク配列に新しいタスクを追加する関数
  const addTask = () => {
    // 新しいタスクが空文字でない場合のみ追加
    if (newTask.trim()) {
      // 新しいタスクでタスク配列を更新
      setTasks([...tasks, {task: newTask, completed: false}]);
      // 新しいタスクを空文字にする
      setNewTask('');
    }
  };

  // タスクを削除する関数
  const completeTask = (index: number) => {
    // タスク配列をコピー
    const newTasks = [...tasks];
    // タスク配列から指定されたタスクを削除
    newTasks.splice(index, 1);
    // タスク配列を更新
    setTasks(newTasks);
  };

  return (
    <div className="p-4">
      {/* 新しいタスクを追加するための入力フィールド */}
      <input
        type="text"
        placeholder="Add a new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
        className="p-2 border rounded w-full mb-8"
      />
      {/* タスクリストをレンダリング */}
      <div>
        {tasks.map((task, index) => (
          <TodoItem
            key={index}
            task={task.task}
            toggleCompletion={() => completeTask(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default TodoList;