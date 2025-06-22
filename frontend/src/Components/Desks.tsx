import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components

interface Desk {
    name: string;
    description: string;
    id: number;
}

export default function Desks() {
    const navigate = useNavigate();
    const [desks, setDesks] = useState<Desk[]>([]);

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
    
    return (
        <div className="desks">
            <h1>Desks</h1>
            {/* <List listof="desks" /> */}
            {desks.map(desk => (
                <div className="desk-container" key={desk.id} onClick={() => navigate(`tasks/${desk.id}`)}>
                    <h2>{desk.name}</h2>
                    <p>{desk.description}</p>
                </div>
            ))}
        </div>
    );
}