import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavigatePage.css'
import StockCards from '../stockCards/StockCards';
import { getCurrentStockPrice } from '../../services/redstone.service';
import { getAllLikedStocks, getAllTrades } from '../../services/http.service';
import { UserContext } from '../../App';
import { useFetch } from '../../hooks/useFetch';
import LoadingScreen from '../loadingScreen/LoadingScreen';

const redstone = require('redstone-api');

export default function NavigatePage() {

    const { activeUser } = useContext(UserContext)

    const [search, setSearch] = useState('')
    const [recentSearch, setRecentSearch] = useState('')
    const [stock, setStock] = useState();

    const [successfulFetch, setsuccessfulFetch] = useState(true)

    const [isLoading, setIsLoading] = useState(true)



    // likedStocks comes in as an array of objects containing the symbol, userId, and id from table 'likes'
    // the api needs an array of symbols
    // the getCurrentStockPrice function returns an object full of objects
    const [likedStocks, reloadLikedStocks] = useFetch(getAllLikedStocks, activeUser?.id, [])
    const [activeTrades, reloadActiveTrades] = useFetch(getAllTrades, activeUser?.id, [])

    // the full stock data of my favorites
    const [favStocks, setFavStocks] = useState([]);


    useEffect(() => {
        if (likedStocks.length !== 0) {
            getFavs(getFavSymbols(likedStocks))
            console.log(likedStocks, 'likedStocks')
        }
    }, [likedStocks])

    useEffect(() => {
        if (favStocks.length !== 0) {
            //  set loading to 'done'
            // setIsLoading(false);
        }
    }, [favStocks])


    /**
     * convert the data from our API into an array of stock symbols
     * @param {*} likedStocks {stock_symbol: string}[]
     * @returns ['AAPL', 'TSLA', '...']
     */
    function getFavSymbols(likedStocks) {
        let favStocksSymbols = []
        for (let i = 0; i < likedStocks.length; i++) {
            favStocksSymbols.push(likedStocks[i].stock_symbol)
        }
        // console.log(favStocksSymbols, 'favStocksSymbols')
        return favStocksSymbols;
    }

    async function getFavs(favStocksSymbols) {

        let favs = await getCurrentStockPrice(favStocksSymbols)
        console.log(favs, 'favs')

        setFavStocks(favs)
        setIsLoading(false)
    }

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
        console.log('one  stock', stock)
        if (stock) {
            setStock(stock);
        } else {
            // handle getting random stock
            setsuccessfulFetch(false)
        }

    }

    return (
        <div className='nav-page-root'>
            <h2>Discover</h2>
            <div className='search-wrapper'>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        className='search'
                        autoFocus
                        type='text'
                        onChange={handleSearchChange}
                        value={search}
                        placeholder='AAPL'
                    />
                    <div onClick={handleSearchSubmit} className='magnifying-glass'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                </form>
            </div>

            {!successfulFetch && <h4>{recentSearch} isn't in our data</h4>}

            {stock
                && <StockCards
                    value={stock.value}
                    symbol={stock?.symbol}
                    likedStocks={likedStocks}
                    activeTrades={activeTrades}
                />
            }

            {likedStocks.length != 0 && <h3>Liked stocks</h3>}


            {likedStocks.length == 0 || isLoading
                ? <LoadingScreen />
                : <div className='liked-stocks'>
                    {favStocks.map((fav, i) => (
                        <StockCards
                            key={fav.symbol}
                            value={fav.value}
                            symbol={fav.symbol}
                            likedStocks={likedStocks}
                            activeTrades={activeTrades}
                        />
                    ))}
                </div>
            }
            <button
                className='secondary'
                onClick={() => {
                    getFavs(getFavSymbols(likedStocks))
                }}>
                reload
            </button>
        </div>
    )
}
