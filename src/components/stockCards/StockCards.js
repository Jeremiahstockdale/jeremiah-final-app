import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './StockCards.css'

export default function StockCards({ symbol, value, toggleIsModalOpen }) {

    const [isHeartClicked, setIsHeartClicked] = useState(false)


    return (
        <div className='stock-card-main'>
            <div className='stock-card-root'>
                <div className='stock-card' onClick={toggleIsModalOpen}>
                    <div className='symbol-wrapper'>
                        <div className='symbol'>{symbol}</div>
                    </div>

                    <div className='value'>${value}</div>
                </div>
            </div>

            <div
                className={'heart ' + (isHeartClicked ? 'clicked' : 'no-click')}
                onClick={() => { setIsHeartClicked(!isHeartClicked) }}>
                <FontAwesomeIcon icon={faHeart} />
            </div>
        </div>
    )
}
