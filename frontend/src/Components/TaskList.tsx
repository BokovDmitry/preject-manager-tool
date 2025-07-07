import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Task from "./Task.tsx";
import { TaskState } from "../Enums/TaskState.ts";
import TaskModal from "./TaskModal.tsx";

import "../Styles/TasksList.scss";

interface taskDetails {
  id: number;
  title: string;
  done: boolean;
  state: TaskState;
}

export default function TaskList() {
  const { deskId } = useParams<{ deskId: string }>();
  const [tasks, setTasks] = useState<taskDetails[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<taskDetails | null>(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tasks/all`, {
        params: {
          deskId: deskId,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log("✅ Tasks received:", res.data);
        setTasks(res.data);
      })
      .catch((error) => {
        console.error("❌ Error fetching tasks:", error);
      });
  }, [deskId]);

  useEffect(() => {
    setIsAddModalOpen(false);
    setEditTask(null);
  }, []);

  const onDelete = async (taskId: number) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}/tasks/deletetask`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          params: {
            taskId: taskId,
          },
        }
      );

      console.log("✅ Task Deleted: ", response.data);
      window.location.reload();
    } catch (error) {
      console.error("❌Delete failed: ", error);
    }
  };

  return (
    <div className="container">
      {deskId && isAddModalOpen && (
        <TaskModal
          method="POST"
          onClose={() => setIsAddModalOpen(!isAddModalOpen)}
          deskId={deskId}
        />
      )}

      {editTask && (
        <TaskModal
          method="PUT"
          onClose={() => setEditTask(null)}
          task={editTask}
          taskId={editTask.id}
        />
      )}

      <div className="backlog-container">
        <h1 className="section-title">Backlog</h1>
        {tasks.map((task) => (
          <div className="task-wrapper">
            <div className="task-container">
              <Task task={task} key={task.id} />
            </div>
            <div className="task-buttons-container">
              <button className="task-button" onClick={() => onDelete(task.id)}>
                Delete
              </button>
              <button className="task-button" onClick={() => setEditTask(task)}>
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="add-task-button"
        onClick={() => setIsAddModalOpen(!isAddModalOpen)}
      >
        Add
      </button>
    </div>
  );
}
