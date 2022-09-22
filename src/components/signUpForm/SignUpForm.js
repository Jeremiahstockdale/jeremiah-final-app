import React, { useContext } from 'react'
import { useState } from 'react';
// import http from '../../../services/http.service'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { signup } from '../../services/http.service'
import { UserContext } from '../../App.js';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {

    const { login } = useContext(UserContext)
    const [isPasswordVisible, setisPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    function handleEntryFormChange(e) {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
    }

    function handleFormSubmit(e) {

        e.preventDefault();

        signup(user)
            .then(response => {
                let user = response.data;
                login(user);
                console.log(user)
                navigate("/home")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='login-form'>
            <form onSubmit={handleFormSubmit}>
                <h4>Sign up</h4>

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
                        <div className='eye' onClick={() => setisPasswordVisible(!isPasswordVisible)}>
                            <FontAwesomeIcon icon={isPasswordVisible ? faEyeSlash : faEye} />
                        </div>
                    </div>

                    <div className='label-input-group password-input-container '>
                        <label>Confirm Password: </label>
                        <input className='text-box'
                            type={!isPasswordVisible ? 'password' : 'text'}
                            name='confirmPassword'
                            value={user.confirmPassword}
                            onChange={handleEntryFormChange}
                            placeholder="confirm"
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
