import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
    return (
        <div>
            <h1>Oops!</h1>
            <p>404 Page Not Found</p>
            <Link to='/home'>take me home</Link>
        </div>
    )
}
