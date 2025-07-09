import axios from "axios";
import { useState, useEffect } from 'react'

import "../Styles/Task.scss"

interface TaskDetails {
  title: string;
  id: number;
  done: boolean;
  state: string;
}

interface TaskProps {
  task: TaskDetails;
}

export default function Task({ task }: TaskProps) {

  const [isChecked, setIsChecked] = useState<boolean>(task.done)

  useEffect(() => {
    task.state === "DONE" ? setIsChecked(true) : setIsChecked(false)
    console.log(task.state)
  }, [task])

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(task))
  }

  return (
    <div 
      className={`task-container ${isChecked ? "checked" : ""}`}
      draggable
      onDragStart={handleDragStart}>
      <label 
        className="task-input-label">
        {task.title}
        <input
          type="checkbox"
          className="task-input"
        />
      </label>
      </div>
);
}
