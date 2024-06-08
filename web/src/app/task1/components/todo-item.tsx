const TodoItem = (props: { task: string; toggleCompletion: () => void; }) => {
  return (
    <div className="flex justify-between p-2 border-b bg-white mb-5">
      {/* タスクの内容 */}
      <span className="flex-1">{props.task}</span>
      {/* タスクの完了ボタン */}
      <button onClick={props.toggleCompletion} className="text-x1">✓</button>
    </div>
  )
}

export default TodoItem;