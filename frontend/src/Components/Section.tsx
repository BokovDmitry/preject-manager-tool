import { useState } from "react";
import { TaskState } from "../Enums/TaskState.ts";
import Task from "./Task.tsx";

import ConfirmationModal from "./ConfirmationModal.tsx";

interface taskDetails {
  id: number;
  title: string;
  done: boolean;
  state: TaskState;
}

interface SectionDetails {
  title: TaskState;
  tasks: taskDetails[];
  onDelete: (id: number) => void;
  onEdit: (task: taskDetails) => void;
  onDropTask : (task : taskDetails, newState : TaskState) => void;
}

export default function Section({
  title,
  tasks,
  onDelete,
  onEdit,
  onDropTask
}: SectionDetails) {

  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const [idToDelete, setIdToDelete] = useState<number>(-1)

  const filteredTasks = tasks.filter((task) => task.state === title);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    try {
      const task: taskDetails = JSON.parse(e.dataTransfer.getData("text/plain"));
      onDropTask(task, title);
    } catch (err) {
      console.error("❌ Failed to drop task:", err);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
    {isDeleteModalOpen ? <ConfirmationModal 
                onClose={() => setDeleteModalOpen(false)}
                onAction={() => {onDelete(idToDelete); setDeleteModalOpen(false)}}
                text="Are ypu sure ypu want to delete this task"
                color="red"
                action="Delete"/> : null}
      <div 
        className={`section-container ${title === "TODO" ? "backlog" : ""}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        >
        <h1 className="section-title">{title.replace("_", " ")}</h1>
        <div className="section-content">
          {filteredTasks.map((task) => (
            <div className="task-wrapper" key={task.id}>
                <Task task={task}/>
              <div className="task-buttons-container">
                <button className="task-button" onClick={() => {setIdToDelete(task.id); setDeleteModalOpen(true)}}>
                  Delete
                </button>
                <button className="task-button" onClick={() => onEdit(task)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
