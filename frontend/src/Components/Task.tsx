import axios from "axios";
import { useState } from 'react'

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

  const checkTask = async (taskId: number) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${taskId}/check`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIsChecked(!isChecked)

      console.log("✅ Successfully checked");
    } catch (error) {
      console.error("❌ Error checking task:", error);
    }
  };

  return (
      <label className="task-input-label">
        {task.title}
        <input
          type="checkbox"
          className="task-input"
          checked={isChecked}
          onChange={() => checkTask(task.id)}
        />
      </label>
);
}
