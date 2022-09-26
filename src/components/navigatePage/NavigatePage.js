import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './NavigatePage.css'
import StockCards from '../stockCards/StockCards';
import { getCurrentStockPrice } from '../../services/redstone.service';
import { getAllLikedStocks } from '../../services/http.service';
import { UserContext } from '../../App';
import { useFetch } from '../../hooks/useFetch';
import { useBoolean } from '../../hooks/useBoolean';
import LoadingScreen from '../loadingScreen/LoadingScreen';

const redstone = require('redstone-api');

export default function NavigatePage() {

    const { activeUser } = useContext(UserContext)

    const [search, setSearch] = useState('')
    const [recentSearch, setRecentSearch] = useState('')
    const [stock, setStock] = useState();

    const [successfulFetch, setsuccessfulFetch] = useState(true)

    const [isLoading, toggleIsLoading] = useBoolean(true)


    // likedStocks comes in as an array of objects containing the symbol, userId, and id from table 'likes'
    // the api needs an array of symbols
    // the getCurrentStockPrice function returns an object full of objects
    const [likedStocks, reloadLikedStocks] = useFetch(getAllLikedStocks, activeUser?.id, [])

    // favStocksObject is the output of the getCurrentStockPrice function
    const [favStocksObject, setfavStocksObject] = useState({})

    // favStocksArray takes the object and turns it into an array of objects
    const favStocksArray = Object.entries(favStocksObject).map(([key, value]) => ({ [key]: value }))
    const propertyNames = Object.getOwnPropertyNames(favStocksObject)
    console.log(propertyNames, 'propertyNames')

    var runOnce = 0;


    useEffect(() => {
        setTimeout((toggleIsLoading(), 3000))
    }, [])


    useEffect(() => {
        if (runOnce === 0) {
            getFavs(getFavSymbols(likedStocks))
            // console.log(likedStocks, 'likedStocks')
            runOnce = runOnce + 1
        }
    }, [likedStocks])

    useEffect(() => {
        // console.log(favStocksObject, 'favStocksObject')
        console.log(favStocksArray, 'favStocksArr')
    }, [favStocksObject])

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
        // console.log(favs, 'favs before')

        if (favs && favs !== {}) {
            // console.log(favs, 'favs')
            setfavStocksObject(favs)
        }
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
        // console.log(stock)
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
                />
            }

            {likedStocks.length != 0 && <h3>Liked stocks</h3>}
            {likedStocks.length == 0 || isLoading
                ? <LoadingScreen />
                : <div className='liked-stocks'>
                    {favStocksArray.map((fav, i) => {
                        // console.log(fav[propertyNames[i]], 'fav i', i, fav[likedStocks[i].stock_symbol]?.symbol)
                        return <StockCards
                            value={fav[propertyNames[i]]?.value}
                            symbol={fav[propertyNames[i]]?.symbol}
                            likedStocks={likedStocks}
                        />
                    })}
                </div>
            }
        </div>
    )
}
