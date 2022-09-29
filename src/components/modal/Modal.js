import React, { useRef } from 'react'
import './Modal.css'


export default function Modal({ title, children, closeModal }) {

    var backgroundRef = useRef();

    function handleBackgroundClicked(e) {

        if (e.target === backgroundRef.current) {
            closeModal && closeModal();
        }
    }


    return (
        <div className='modal-root'
            onClick={handleBackgroundClicked}
            ref={backgroundRef}
        >

            <div className='modal'>

                <h2>{title}</h2>
                {children}
            </div>

        </div>
    )
}
