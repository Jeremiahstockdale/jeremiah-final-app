import React from 'react'
import { Link } from 'react-router-dom';
import SignUpForm from '../signUpForm/SignUpForm';

export default function SignUpPage() {

    return (
        <div className='entry-page-root'>
            <SignUpForm />

            <div className='link'>
                <Link to='/login'>Or Login</Link>
            </div>

        </div>
    )
}
