import {useState} from 'react';
import axios from 'axios';

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSumbit = async(e) => {
       e.preventDefault();
       
       try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                username: username,
                password: password
            });

            const token = response.data.token;

            console.log(token);

            localStorage.setItem('token', token);

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            window.location.href = '/desks';
       } catch (error) {
            console.error('Login failed:', error);
       }
    } 

    return (
        <div className="login-container">
            <h3 className="login-title"></h3>
            <form className="login-form" method="post" onSubmit={handleSumbit}>
                <label className="login-form-filed-label"> Username
                    <input type="text" placeholder="Username" className="login-form-field" onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label className="login-form-filed-label"> Password
                    <input type="password" placeholder="Password" className="login-form-field" onChange={(e) => setPassword(e.target.value)}/>
                </label>

                <input type='submit' className='login-form-send' value="Login" />
            </form>
        </div>
    )
} 