import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faEnvelope, faShare } from '@fortawesome/free-solid-svg-icons'


export default function Footer() {
    return (
        <footer>
            <div className='left'></div>
            <div className='right'>
                <FontAwesomeIcon icon={faImage} />
                <FontAwesomeIcon icon={faEnvelope} />
                <FontAwesomeIcon icon={faShare} />
            </div>
        </footer>
    )
}
