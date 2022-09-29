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
import STOCK_TICKER from '../../assets/stockNameToTicker.json'

const redstone = require('redstone-api');

export default function NavigatePage() {

    const { activeUser } = useContext(UserContext)

    const [search, setSearch] = useState('')
    const [recentSearch, setRecentSearch] = useState('')
    const [stock, setStock] = useState();
    const [successfulFetch, setsuccessfulFetch] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [favStocks, setFavStocks] = useState([]);

    const [likedStocks, reloadLikedStocks] = useFetch(getAllLikedStocks, activeUser?.id, [])
    const [activeTrades, reloadActiveTrades] = useFetch(getAllTrades, activeUser?.id, [])


    useEffect(() => {
        getFavs(getFavSymbols(likedStocks))
    }, [likedStocks])

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
        return favStocksSymbols;
    }

    async function getFavs(favStocksSymbols) {

        let favs = await getCurrentStockPrice(favStocksSymbols)

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
        let stock = 0;

        if (STOCK_TICKER[search]) {
            let searchable = STOCK_TICKER[search]

            stock = await getCurrentStockPrice(searchable);

        } else {
            stock = await getCurrentStockPrice(search);
        }

        if (stock && stock != undefined) {
            setStock(stock);
            setsuccessfulFetch(true)
        } else if (stock == undefined) {
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

            {!successfulFetch
                && <h4>{recentSearch} isn't in our data</h4>
            }

            {stock
                && <StockCards
                    value={stock.value}
                    symbol={stock?.symbol}
                    likedStocks={likedStocks}
                    activeTrades={activeTrades}
                />
            }

            {likedStocks.length != 0
                ? <h3>
                    Liked stocks
                </h3>
                : <h3>
                    You don't have any favorites yet
                </h3>
            }

            {likedStocks.length == 0 || isLoading
                ? <LoadingScreen />
                : <div className='liked-stocks'>
                    {favStocks?.map((fav, i) => (
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
                className='secondary reload'
                onClick={() => {
                    getFavs(getFavSymbols(likedStocks))
                }}
            >
                reload
            </button>

        </div>
    )
}
