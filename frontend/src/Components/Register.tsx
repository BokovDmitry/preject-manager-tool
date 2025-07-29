import { useState } from "react"

interface RegisterDetails {
    onCancel : () => void
}

export default function Register({onCancel} : RegisterDetails) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        return
    }

    return (
        <div className="login-container">
            <h3 className="login-title">Register</h3>
            <form className="login-form" method="post" onSubmit={handleSubmit}>
                <label className="login-form-field-label"> Username
                    <input type="text" placeholder="Username" className="login-form-field" onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <label className="login-form-field-label"> Password
                    <input type="password" placeholder="Password" className="login-form-field" onChange={(e) => setPassword(e.target.value)}/>
                </label>

                <input type='submit' className='login-form-send' value="Register" />
                <input type='button' className='login-form-send' value="Cancel" onClick={onCancel}/>
            </form>
        </div>
    )
}