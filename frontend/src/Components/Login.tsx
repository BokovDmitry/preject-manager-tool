import {useState,useEffect} from 'react';
import axios from 'axios';

import Register from "./Register.tsx"

import "../Styles/Login.scss"

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registerForm, setRegisterForm] = useState<boolean>(false)
    const [logged, setLogged] = useState<boolean>(false)

    const handleSubmit = async(e) => {
       e.preventDefault();
       
       try{
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
                username: username,
                password: password
            });

            const token = response.data.token;

            console.log(token);

            localStorage.setItem('token', token);
            localStorage.setItem('username', username)

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            window.location.href = '/home';
       } catch (error) {
            console.error('Login failed:', error);
       }
    } 

    useEffect(() => {
        if(localStorage.getItem("token") !== null)
            setLogged(true)
        else
            setLogged(false)

        console.log(logged)
    })

    return (
        <>
            {registerForm ? <Register onCancel={()=>setRegisterForm(false)}/> : 
            <div className="login-container">
                <h3 className="login-title">Login</h3>
                <form className="login-form" method="post" onSubmit={handleSubmit}>
                    <label className="login-form-field-label"> Username
                        <input type="text" placeholder="Username" className="login-form-field" onChange={(e) => setUsername(e.target.value)}/>
                    </label>
                    <label className="login-form-field-label"> Password
                        <input type="password" placeholder="Password" className="login-form-field" onChange={(e) => setPassword(e.target.value)}/>
                    </label>

                    <input type='submit' className='login-form-send' value="Login" />
                </form>
                <p className='login-form-text'>Don't have an account yet? <span 
                                                                            className='login-form-register-link'
                                                                            onClick={()=>setRegisterForm(true)}>Register</span>!</p>
            </div>
                }
        </>
    )
} 