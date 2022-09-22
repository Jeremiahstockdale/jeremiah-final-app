import React, { useRef } from 'react'
import './Modal.css'


export default function Modal({ title, children, closeModal }) {

    var backgroundRef = useRef();

    function handleBackgroundClicked(e) {

        console.log("modal clicked somewhere")

        if (e.target === backgroundRef.current) {
            console.log("background was clicked")
            closeModal && closeModal();
        } else {
            console.log("not exactly the background")
        }
    }


    return (
        <div className='modal-root'
            onClick={handleBackgroundClicked}
            ref={backgroundRef}>
            <div className='modal'>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    )
}
