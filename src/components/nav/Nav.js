import React, { useContext, useState } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faCompass, faUser, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App'

export default function Nav() {

    const { activeUser, login } = useContext(UserContext)
    // const [activeUser, setActiveUser] = useState(false)

    return (

        <nav className='navRoot'>
            <div className='left'>
                <Link to='home'>
                    <FontAwesomeIcon icon={faHome} />
                </Link>
            </div>

            <div className='center'>
                <Link to='navigate'>
                    <FontAwesomeIcon icon={faCompass} />
                </Link>

                <Link to='trades'>
                    <FontAwesomeIcon icon={faChartLine} />
                </Link>
            </div>

            <div className='right'>
                {activeUser
                    ? (
                        <Link to="profile">
                            <FontAwesomeIcon icon={faUser} />
                        </Link>
                    )
                    : (
                        <Link to="login">
                            <button className='primary'>Login</button>
                        </Link>

                    )
                }
            </div>
        </nav>
    )
}
