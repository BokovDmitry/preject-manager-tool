import { useEffect, useState } from 'react';
import axios from 'axios';

interface ListProps {
    listof: string;
}

function List({ listof }: ListProps) {
    const [message, setMessage] = useState<string>('');
    const baseURL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        axios.get(`${baseURL}/desks`)
            .then(response => setMessage(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [listof]);

    return (
        <div className="list">
            <h2>{listof}</h2>
            <p>{message}</p>
        </div>
    );
}

export default List;