import { TaskState } from "../Enums/TaskState.ts" 

interface taskSelectorDetails {
    value : TaskState
    onChange : (value: TaskState) => void
}

export default function  StateSelector({ value, onChange } : taskSelectorDetails) {
    return (
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
    )

}