import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import DeskModal from "./DeskModal.tsx";

interface DeskDetails {
    name: string;
    description: string;
    id: number;
}

export default function Desks() {
    const navigate = useNavigate();
    const [desks, setDesks] = useState<DeskDetails[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
    const [editDesk, setEditDesk] = useState<DeskDetails | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`${process.env.REACT_APP_API_URL}/desks`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                username : localStorage.getItem('username')
            }
        })
        .then(response => setDesks(response.data))
        .catch(error => console.error("Error fetching data:", error));
    }, []);

    const onDelete = async(id : number) => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/desks/${id}`, {
                headers : {
                    Authorization : `Bearer ${localStorage.getItem('token')}`
                }
            })
            
            console.log("✅ Desk Deleted: ", response.data);
            window.location.reload()
        } catch(error) {
            console.error("❌Delete failed: ", error)
        }
    }
    
    return (
        <div className="desks">
            {localStorage.getItem('username') && isAddModalOpen && <DeskModal method="POST" onClose={() => setIsAddModalOpen(false)} username={localStorage.getItem('username')!}/>}
            {editDesk && <DeskModal method="PUT" onClose={() => setEditDesk(null)} desk={editDesk} deskId={editDesk.id}/>}
            <h1>Desks</h1>
            {desks.map(desk => (
                <div className="desk-container" key={desk.id}>
                    <h2 onClick={() => navigate(`tasks/${desk.id}`)}>{desk.name}</h2>
                    <p>{desk.description}</p>
                    <button onClick={()=>setEditDesk(desk)}>Edit</button>
                    <button onClick={() => onDelete(desk.id)}>Delete</button>
                </div>
            ))}

            <button onClick={() => setIsAddModalOpen(!isAddModalOpen)}>Add</button>
        </div>
    );
}