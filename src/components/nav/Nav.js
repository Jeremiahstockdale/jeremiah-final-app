import React, { useContext } from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faUser, faChartLine } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App'
import octopusIcon from '../../images/octopus_icon.png'

export default function Nav() {

    const { activeUser } = useContext(UserContext)


    return (
        <nav className='nav-root'>

            <div className='left'>
                <Link to='home'>
                    <div className='hoverable'>
                        <img className='image' src={octopusIcon} alt='Home' />
                        <p className='path'>home</p>
                    </div>
                </Link>
            </div>

            <div className='center'>
                <Link to='navigate'>
                    <div className='hoverable'>
                        <FontAwesomeIcon icon={faCompass} />
                        <p className='path'>search</p>
                    </div>
                </Link>

                <Link to='trades'>
                    <div className='hoverable'>
                        <FontAwesomeIcon icon={faChartLine} />
                        <p className='path'>portfolio</p>
                    </div>
                </Link>
            </div>

            <div className='right'>
                {activeUser
                    ? (
                        <Link to="profile">
                            <div className='hoverable'>
                                <FontAwesomeIcon icon={faUser} />
                                <p className='path'>profile</p>
                            </div>
                        </Link>
                    )
                    : (
                        <Link to="login">
                            <button className='primary'>
                                Login
                            </button>
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}
