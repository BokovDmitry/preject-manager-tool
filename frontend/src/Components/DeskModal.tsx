import { useState } from "react";
import axios from "axios";

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
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button onClick={onSave}>Save</button>
            <button onClick={onClose}>Close</button>
        </div>
    )
}