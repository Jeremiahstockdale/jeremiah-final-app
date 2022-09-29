import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faEnvelope, faShare } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../App'


export default function Footer() {

    const { activeUser } = useContext(UserContext)

    return (
        <footer>

            <div className='left' >
                <h6>
                    {activeUser?.username}
                </h6>
            </div>

            <div className='right'>
                <FontAwesomeIcon icon={faImage} />
                <FontAwesomeIcon icon={faEnvelope} />
                <FontAwesomeIcon icon={faShare} />
            </div>

        </footer >
    )
}
