import { useState } from "react";
import axios from "axios";

import "../Styles/DeskModal.scss"

interface DeskDetails {
    name: string;
    description: string;
}

interface DeskModalDetails {
    method : "POST" | "PUT"
    onClose : () => void
    desk? : DeskDetails
    username? : string
    deskId? : number
}

export default function DeskModal({method, desk, onClose, deskId, username} : DeskModalDetails) {

    const [name, setName] = useState<string>(desk?.name || "")
    const [description, setDescription] = useState<string>(desk?.description || "")

    const onSave = async() => {
        try{
            const payload : DeskDetails = {name, description}

            const url = method === "POST"
            ? `${process.env.REACT_APP_API_URL}/desks/newdesk`
            : `${process.env.REACT_APP_API_URL}/desks/edit`

            const response = await axios({
                method : method.toLowerCase(),
                url,
                data : payload,
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                },
                params : {
                    username : username,
                    id : deskId
                }
            })

            console.log("✅ Desk saved", response.data);
            window.location.reload()
            onClose()
        } catch (error) {
            console.error("❌ Error saving desk:", error);
        }

    }

    return (
        <div className="desk-modal-container">
            <div className="desk-modal-header">
              <h2 className="desk-modal-header-title">{method === "POST" ? "Add" : "Edit"} Task</h2>
              <button onClick={onClose} className="desk-modal-close">×</button>
            </div>
            <div className="desk-modal-content">
                <div className="desk-modal-field">
                    <p className="desk-modal-title">
                        Title
                    </p>
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Title"
                        className="desk-modal-input"
                    />
                </div>
                <div className="desk-modal-field">
                    <p className="desk-modal-title">
                        Description
                    </p>
                    <textarea 
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="desk-modal-input"
                    />
                </div>
            </div>
            <div className="desk-modal-buttons-container">
                {/* <button onClick={onClose} className="desk-modal-button">Close</button> */}
                <button onClick={onSave}  className="desk-modal-button">Save</button>
            </div>
        </div>
    )
}