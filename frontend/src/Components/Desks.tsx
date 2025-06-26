import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import DeskModal from "./DeskModal.tsx";
import "../Styles/Desks.scss"

interface TaskDetails {
  title: string;
  id: number;
  done: boolean;
  state: string;
}

interface DeskDetails {
    name: string;
    description: string;
    id: number;
    tasks : TaskDetails[]
}

export default function Desks() {
    const navigate = useNavigate();
    const [desks, setDesks] = useState<DeskDetails[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
    const [editDesk, setEditDesk] = useState<DeskDetails | null>(null)
    const [taskNum, setTaskNum] = useState<number>(0)

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
        <div className="desks-container">
            {localStorage.getItem('username') && isAddModalOpen && <DeskModal method="POST" onClose={() => setIsAddModalOpen(false)} username={localStorage.getItem('username')!}/>}
            {editDesk && <DeskModal method="PUT" onClose={() => setEditDesk(null)} desk={editDesk} deskId={editDesk.id}/>}
            {desks.map(desk => (
                <div className="desk-container" key={desk.id}>
                    <div className="desk-hat">
                        <p 
                            onClick={() => navigate(`tasks/${desk.id}`)}
                            className="desk-title">
                                {desk.name}
                        </p>
                    </div>
                    <div className="desk-content">
                        <p>{desk.description}</p>
                        <p>Tasks : {desk.tasks.length}</p>
                        <button onClick={()=>setEditDesk(desk)}>Edit</button>
                        <button onClick={() => onDelete(desk.id)}>Delete</button>
                    </div>
                </div>
            ))}

            <button onClick={() => setIsAddModalOpen(!isAddModalOpen)}>Add</button>
        </div>
    );
}