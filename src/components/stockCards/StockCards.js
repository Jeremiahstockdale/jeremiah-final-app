import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faArrowUp, faHeart } from '@fortawesome/free-solid-svg-icons';
import './StockCards.css'
import { addLikedStock, addMoneyById, addTrade, deleteLikedStock, deleteTrade } from '../../services/http.service';
import { UserContext } from '../../App';
import StockHistory from '../stockHistory/StockHistory';
import Modal from '../modal/Modal';
import { useBoolean } from '../../hooks/useBoolean';
import STOCK_NAMES from '../../assets/stockTickerToName.json'

export default function StockCards({ symbol, value, likedStocks, activeTrades }) {

    const { activeUser, addFunds } = useContext(UserContext)

    const [isHeartClicked, setIsHeartClicked] = useState(false)
    const [likeId, setlikeId] = useState()
    const [sharesInput, setSharesInput] = useState()
    const [userOwnsThis, setUserOwnsThis] = useState()
    const [trade, setTrade] = useState({
        shares: 0,
        id: ''
    })

    const [isModalOpen, toggleIsModalOpen] = useBoolean(false)

    const displayName = STOCK_NAMES[symbol];

    var userId = activeUser?.id;
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    useEffect(() => {
        likedCheck();
    }, [symbol])

    useEffect(() => {
        ownCheck();
    }, [isModalOpen])

    function likedCheck() {

        for (let i = 0; i < likedStocks?.length; i++) {
            const element = likedStocks[i];

            if (symbol == element.stock_symbol) {
                setlikeId(element.id)
                setIsHeartClicked(true)
                return;
            }
        }

        setIsHeartClicked(false)
    }

    function ownCheck() {

        for (let i = 0; i < activeTrades?.length; i++) {
            const element = activeTrades[i];

            if (symbol == element.stock_symbol) {
                setUserOwnsThis(true);
                setTrade({
                    ...trade,
                    id: element.id,
                    shares: element.shares,
                    initSharePrice: element.init_share_price
                })
                console.log(trade, 'test')

                return;
            }
        }
    }

    function handleInputChange(e) {
        let { value } = e.target;
        let newValue = Number(value)
        if (newValue < 1000000000000) {
            setSharesInput(newValue)
        }
    }

    function handleHeartClicked() {
        if (!isHeartClicked) {
            // console.log(symbol, userId, 'symbol userid')
            addLikedStock({ symbol, userId })
            setIsHeartClicked(true)
        } else {
            let id = likeId
            deleteLikedStock(id)
            setIsHeartClicked(false)
        }
    }

    function handleBuySubmit(e) {
        e.preventDefault()

        let sharePrice = value;
        let shares = sharesInput;
        addTrade({ symbol, userId, sharePrice, shares })
            .then(response => {
                setUserOwnsThis(true);

                let id = activeUser.id;
                let cost = (-1) * (sharePrice * shares);
                let pretendMoney = Number(activeUser.account_value) + Number(cost)

                addMoneyById({ id, pretendMoney })
                    .then(response => {
                        addFunds(cost)
                    })
                    .catch((err) => {
                        console.error(err)
                    })
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                toggleIsModalOpen()
            })
    }

    function handleSellClicked() {

        let sharePrice = value;
        let id = activeUser.id;
        let cost = (sharePrice * trade.shares);
        let pretendMoney = Number(activeUser.account_value) + Number(cost)

        addMoneyById({ id, pretendMoney })
            .then(response => {
                addFunds(cost);
                deleteTrade(trade.id)
            })
            .catch((err) => {
                console.error(err)
            })
            .finally(() => {
                toggleIsModalOpen();
                setUserOwnsThis(false);
                window.location.reload();
            })
    }

    return (
        <div className='stock-card-main'>

            <div className='stock-card-heart'>

                <div className='stock-card-root'>

                    <div className={'stock-card ' + (userOwnsThis && 'owned')} onClick={toggleIsModalOpen}>

                        <div className='symbol-wrapper'>
                            <h4 className='symbol'>
                                {symbol}
                            </h4>
                            {displayName && <div
                                className='name '
                            >
                                {displayName}
                            </div>}
                        </div>

                        <div className='value-arrow-wrapper'>
                            <div>
                                <div className='value'>
                                    {formatter.format(value)}
                                </div>
                                {userOwnsThis && <p className='shares-card'>{trade.shares} shares</p>}
                            </div>

                            {userOwnsThis && <div className={'arrow ' + (value - trade.initSharePrice < 0 && 'negative')}>
                                {(value - trade.initSharePrice >= 0)
                                    ? <FontAwesomeIcon icon={faArrowUp} />
                                    : <FontAwesomeIcon icon={faArrowDown} />
                                }
                            </div>}
                        </div>

                    </div>
                </div>

                <div
                    className={'heart ' + (isHeartClicked ? 'clicked' : 'no-click')}
                    onClick={handleHeartClicked}
                >
                    <FontAwesomeIcon icon={faHeart} />
                </div>

            </div>


            {isModalOpen && (
                <Modal title={symbol + " - " + formatter.format(value)}
                    closeModal={toggleIsModalOpen} >

                    <StockHistory symbol={symbol} />
                    <p className='shares'>60 day history</p>

                    {userOwnsThis
                        ? <p className='shares'>You own {trade.shares} share(s) worth {formatter.format(trade.shares * value)}&nbsp;
                            ({formatter.format(trade.shares * value - trade.initSharePrice * trade.shares)} return)</p>
                        : <p className='shares'>
                            {value * sharesInput > 0 ? 'total cost ' + formatter.format(value * sharesInput) : <p>&nbsp;</p>}
                        </p>
                    }

                    <form onSubmit={handleBuySubmit}>

                        <div className='button wrapper'>

                            <button
                                type='button'
                                className='secondary'
                                onClick={toggleIsModalOpen}
                            >
                                Close
                            </button>

                            {!userOwnsThis
                                ? <>
                                    <button
                                        type='submit'
                                        className='primary'
                                    >
                                        Buy
                                    </button>

                                    <input
                                        type='number'
                                        placeholder='# of shares'
                                        onChange={handleInputChange}
                                        name='sharesInput'
                                        value={sharesInput}
                                        required
                                    />
                                </>
                                : <button
                                    type='button'
                                    className='primary'
                                    onClick={handleSellClicked}
                                >
                                    Sell Shares
                                </button>
                            }
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    )
}
