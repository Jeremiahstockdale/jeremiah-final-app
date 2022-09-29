import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LoginForm.css'
import { login as httpLogin } from '../../services/http.service';
import { UserContext } from '../../App';


export default function LoginForm() {

    const { login } = useContext(UserContext)

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const navigate = useNavigate();


    function handleEntryFormChange(e) {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        httpLogin(user)
            .then(response => {
                let user = response.data;
                login(user);
                navigate("/home")
            })
            .catch(() => { })
    }


    return (
        <div className='login-form'>

            <form onSubmit={handleFormSubmit}>

                <h4>Login</h4>

                <div className='inputs-container'>

                    <div className='label-input-group'>

                        <label>Username: </label>
                        <input autoFocus className='text-box'
                            type='text'
                            name='username'
                            value={user.username}
                            onChange={handleEntryFormChange}
                            placeholder="username"
                        />

                    </div>

                    <div className='label-input-group password-input-container'>

                        <label>Password: </label>
                        <input className='text-box'
                            type={!isPasswordVisible ? 'password' : 'text'}
                            name='password'
                            value={user.password}
                            onChange={handleEntryFormChange}
                            placeholder="password"
                        />

                        <div className='eye' onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                        </div>

                    </div>

                    <div className='label-input-group password-input-container no-display'>

                        <label>Confirm Password: </label>
                        <input className='text-box'
                            type={!isPasswordVisible ? 'password' : 'text'}
                            name='confirmPassword'
                            value={user.password}
                            onChange={() => { }}
                            placeholder="password"
                        />

                    </div>

                    <button type='submit'
                        className='secondary'>
                        Log in
                    </button>

                </div>
            </form>
        </div>
    )
}
