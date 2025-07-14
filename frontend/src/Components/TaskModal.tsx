import { TaskState } from "../Enums/TaskState.ts"
import { useState } from "react"
import axios from "axios"

import StateSelector from "./StateSelector.tsx"

import "../Styles/TaskModal.scss"

interface TaskDetails {
    title : string
    done : boolean
    state : TaskState
}

interface TaskModalDetails {
    method : "POST" | "PUT"
    task? : TaskDetails
    onClose : () => void
    deskId? : string
    taskId? : number
}

export default function TaskModal({method, task, onClose, deskId, taskId} : TaskModalDetails) {

    const [title, setTitle] = useState<string>(task?.title || "")
    const [done, setDone] = useState<boolean>(task?.done || false)
    const [state, setState] = useState<TaskState>(task?.state || TaskState.TODO)

    const onSave = async() => {
        try {

            const payload : TaskDetails = {title, done, state}
    
            const url = method === "POST"
            ? `${process.env.REACT_APP_API_URL}/tasks/newtask`
            : `${process.env.REACT_APP_API_URL}/tasks/edittask`
    
            const response = await axios({
                method : method.toLowerCase(),
                url,
                data : payload,
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
                params : {
                    deskId : deskId,
                    taskId : taskId
                } 
            })
    
            console.log("✅ Task saved", response.data);
            window.location.reload()
            onClose()
        } catch (error) {
            console.error("❌ Error saving task:", error);
        }
    }

    return (
        <div className="task-modal-container">
            <div className="task-modal-header">
              <h2 className="task-modal-header-title">{method === "POST" ? "Add" : "Edit"} Task</h2>
              <button onClick={onClose} className="task-modal-close">×</button>
            </div>

            <div className="task-modal-content">
                <div className="task-modal-field">
                    <p className="task-modal-title">Title</p>
                    <input 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                        className="task-modal-input"
                    />
                </div>

                <StateSelector value={state} onChange={setState}/>
                
                <div className="task-modal-buttons-container">
                    <button onClick={onSave} className="task-modal-button">Save</button>
                </div>
            </div>
        </div>
    )
}