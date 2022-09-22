import React from 'react'
import { Link } from 'react-router-dom';
import LoginForm from '../loginForm/LoginForm';
import './LoginPage.css'

export default function LoginPage() {

    return (
        <div className='entry-page-root'>
            <LoginForm />

            <div className='link'>
                <Link to='/signup'>Or Sign up!</Link>
            </div>

        </div>
    )
}
