import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import DeskModal from "./DeskModal.tsx";
import ConfirmationModal from "./ConfirmationModal.tsx"
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
    progress : number
}

export default function Desks() {
    const navigate = useNavigate();
    const [desks, setDesks] = useState<DeskDetails[]>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
    const [editDesk, setEditDesk] = useState<DeskDetails | null>(null)
    const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const [idToDelete, setIdToDelete] = useState<number>(-1)

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
        .then(response => {
            setDesks(response.data)
            console.log(response.data)
        })
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
        <>
        {isDeleteModalOpen ? <ConfirmationModal 
                    onClose={() => setDeleteModalOpen(false)} 
                    onAction={() => onDelete(idToDelete)} 
                    text="Are you sure you want to delete this desk?"
                    color="red"
                    action="Delete"/> : null}
        <div className="desks-container">
            {localStorage.getItem('username') && isAddModalOpen && <DeskModal method="POST" onClose={() => setIsAddModalOpen(false)} username={localStorage.getItem('username')!}/>}
            {editDesk && <DeskModal method="PUT" onClose={() => setEditDesk(null)} desk={editDesk} deskId={editDesk.id}/>}
            {desks.map(desk => (
                <div className="desk-container" key={desk.id} onClick={() => navigate(`tasks/${desk.id}`)}>
                    <div className="desk-hat">
                        <p 
                            className="desk-title">
                                {desk.name}
                        </p>
                    </div>
                    <div className="desk-content">
                        <div className="desk-description">{desk.description}</div>
                        <div className="desk-progress-container">
                            <div className="desk-progress" style={{ width : desk.progress+"%" }}></div>
                        </div>
                        <div className="desk-buttons-container">
                            <div onClick={(e)=>{e.stopPropagation(); setEditDesk(desk)}} className="desk-button-container">
                                <img className="desk-button" src="/icons/pencil.png" alt="edit" />
                            </div>
                            <div onClick={(e) => {e.stopPropagation(); setDeleteModalOpen(true); setIdToDelete(desk.id)}} className="desk-button-container">
                                <img className="desk-button" src="/icons/delete.png" alt="delete"/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
        <button onClick={() => setIsAddModalOpen(!isAddModalOpen)} className="desk-add-button">Add</button>
        </>
    );
}