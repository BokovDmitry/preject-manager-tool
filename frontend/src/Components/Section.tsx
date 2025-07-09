import { TaskState } from "../Enums/TaskState.ts";
import Task from "./Task.tsx";

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
    <div 
      className={`section-container ${title === "TODO" ? "backlog" : ""}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      >
      <h1 className="section-title">{title.replace("_", " ")}</h1>
      {filteredTasks.map((task) => (
        <div className="task-wrapper" key={task.id}>
            <Task task={task}/>
          <div className="task-buttons-container">
            <button className="task-button" onClick={() => onDelete(task.id)}>
              Delete
            </button>
            <button className="task-button" onClick={() => onEdit(task)}>
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
