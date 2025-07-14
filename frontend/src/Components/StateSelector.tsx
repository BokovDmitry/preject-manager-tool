import { TaskState } from "../Enums/TaskState.ts" 

import "../Styles/StateSelector.scss"

interface taskSelectorDetails {
    value : TaskState
    onChange : (value: TaskState) => void
}

export default function  StateSelector({ value, onChange } : taskSelectorDetails) {
    return (
        <div className="state-selector-container">
            <p className="task-state-selector-title">State:</p>
            <select 
                value={value}
                onChange={(e) => onChange(e.target.value as TaskState)}
                className="task-state-selector"    
            >
                {Object.values(TaskState).map(state => (
                    <option 
                        key={state} 
                        className="task-state-selector-option"
                        value={state}
                        >
                            {state}
                        </option>
                ))}
            </select>
        </div>
    )

}