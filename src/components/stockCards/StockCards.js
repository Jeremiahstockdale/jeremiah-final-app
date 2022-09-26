import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import './StockCards.css'
import { addLikedStock, deleteLikedStock } from '../../services/http.service';
import { UserContext } from '../../App';
import StockHistory from '../stockHistory/StockHistory';
import Modal from '../modal/Modal';
import { useBoolean } from '../../hooks/useBoolean';

export default function StockCards({ symbol, value, likedStocks }) {

    const { activeUser } = useContext(UserContext)
    const [isHeartClicked, setIsHeartClicked] = useState(false)
    const [likeId, setlikeId] = useState()

    const [isModalOpen, toggleIsModalOpen] = useBoolean(false)

    var userId = activeUser?.id;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    useEffect(() => {
        likedCheck()
    }, [symbol])

    function likedCheck() {
        for (let i = 0; i < likedStocks.length; i++) {
            const element = likedStocks[i];
            if (symbol == element.stock_symbol) {
                setlikeId(element.id)
                setIsHeartClicked(true)
                return;
            }
        }
        setIsHeartClicked(false)
    }

    function handleHeartClicked() {
        if (!isHeartClicked) {
            console.log(symbol, userId, 'symbol userid')
            addLikedStock({ symbol, userId })
            setIsHeartClicked(true)
        } else {
            let id = likeId
            console.log(id, symbol)
            deleteLikedStock(id)
            setIsHeartClicked(false)
        }
    }

    return (
        <div className='stock-card-main'>
            <div className='stock-card-heart'>
                <div className='stock-card-root'>
                    <div className='stock-card' onClick={toggleIsModalOpen}>
                        <div className='symbol-wrapper'>
                            <div className='symbol'>{symbol}</div>
                        </div>

                        <div className='value'>{formatter.format(value)}</div>
                    </div>
                </div>

                <div className={'heart ' + (isHeartClicked ? 'clicked' : 'no-click')}
                    onClick={handleHeartClicked}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>

            {isModalOpen && (
                <Modal title={symbol + " - " + formatter.format(value)}
                    closeModal={toggleIsModalOpen} >

                    <StockHistory symbol={symbol} />
                    <p>60 day history</p>

                    {/* TODO: add buy/sell functionality */}
                    <form onSubmit={() => { }}>

                        {/* buttons */}
                        <div className='button wrapper'>
                            <button
                                type='button'
                                className='secondary'
                                onClick={toggleIsModalOpen}
                            >
                                Close
                            </button>

                            <button
                                type='submit'
                                className='primary'
                            >
                                Buy || Sell
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}
