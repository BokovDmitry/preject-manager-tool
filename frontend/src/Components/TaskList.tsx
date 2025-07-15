import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import Section from "./Section.tsx";
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

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/tasks/all`, {
        params: { deskId },
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

  const onDelete = async (taskId: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/deletetask`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: { taskId },
      });
      console.log("✅ Task Deleted:", taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error("❌ Delete failed:", error);
    }
  };

  const handleTaskDrop = async (task: taskDetails, newState: TaskState) => {
    if(task.state === newState) return
    
    try {
      await axios.patch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}/update`, 
        {state : newState},
        {
          headers: {
            Authorization : `Bearer ${localStorage.getItem("token")}`
          }
      })

      setTasks((prevTask) => prevTask.map((t) => t.id === task.id ? {...t, state: newState} : t))

      console.log("✅ Task moved to:", newState);
    } catch(error) {
      console.error(error)
    }

  }

  return (
    <div className="container">
      <div className="return-button-container">
        <img src="/icons/back.png" className="return-button" onClick={() => navigate("/desks")}/>
      </div>
      {deskId && isAddModalOpen && (
        <TaskModal
          method="POST"
          onClose={() => setIsAddModalOpen(false)}
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

      <div className="section-grid">
        {(Object.values(TaskState) as TaskState[]).map((state) => (
          <Section
            key={state}
            title={state}
            tasks={tasks.filter((task) => task.state === state)}
            onDelete={onDelete}
            onEdit={setEditTask}
            onDropTask={handleTaskDrop}
          />
        ))}
      </div>

      <button
        className="add-task-button"
        onClick={() => setIsAddModalOpen(true)}
      >
        Add
      </button>
    </div>
  );
}
