import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavigatePage.css'
import StockCards from '../stockCards/StockCards';
import Modal from '../modal/Modal';
import { useBoolean } from '../../hooks/useBoolean';
import { getCurrentStockPrice } from '../../services/redstone.service';
import StockHistory from '../stockHistory/StockHistory';

const redstone = require('redstone-api');

export default function NavigatePage() {

    const [search, setSearch] = useState('')
    const [recentSearch, setRecentSearch] = useState('')

    const [stock, setStock] = useState();
    // const [stockPrice, setStockPrice] = useState();
    // const [stockSymbol, setStockSymbol] = useState();

    const [successfulFetch, setsuccessfulFetch] = useState(true)
    const [isModalOpen, toggleIsModalOpen] = useBoolean(false)

    function handleSearchChange(e) {
        let { value } = e.target;
        let placeholder = value.toUpperCase();

        setSearch(placeholder)
    }

    async function handleSearchSubmit(e) {
        e.preventDefault();
        setsuccessfulFetch(true)
        setRecentSearch(search)

        let stock = await getCurrentStockPrice(search);
        // console.log(stock)
        if (stock) {
            setStock(stock);
        } else {
            // handle getting random stock
            setsuccessfulFetch(false)
        }

        // try {
        //     const stock = await redstone.getPrice(search)
        //     setStockPrice(price.value)
        //     setStockSymbol(price.symbol)

        // } catch {
        //     const prices = await redstone.getAllPrices()

        //     var result;
        //     var count = 0;
        //     for (var prop in prices) {
        //         if (Math.random() < 1 / ++count) {
        //             result = prop;
        //         }
        //     }

        //     const price = await redstone.getPrice(result)
        //     setStockPrice(price.value)
        //     setStockSymbol(price.symbol)
        //     setsuccessfulFetch(false)
        // }
    }

    return (
        <div className='nav-page-root'>
            <h2>Discover</h2>
            <div className='search-wrapper'>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        autoFocus
                        type='text'
                        onChange={handleSearchChange}
                        value={search}
                        placeholder='TSLA'
                    />
                    <div onClick={handleSearchSubmit} className='magnifying-glass'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                </form>
            </div>

            {!successfulFetch && <h4>{recentSearch} isn't in our data</h4>}

            {stock
                && <StockCards value={stock.value.toFixed(2)} symbol={stock.symbol} toggleIsModalOpen={toggleIsModalOpen} />
            }

            {/* {stockPrice
                && <StockCards value={stockPrice.toFixed(2)} symbol={stockSymbol} toggleIsModalOpen={toggleIsModalOpen} />
            } */}

            {isModalOpen && (
                <Modal title="Historical price graph"
                    closeModal={toggleIsModalOpen} >
                    <StockHistory symbol={stock.symbol} />
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
