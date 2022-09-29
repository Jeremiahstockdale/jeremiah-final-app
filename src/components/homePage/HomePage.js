import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useFetch } from '../../hooks/useFetch'
import { getAllLikedStocks, getAllTrades } from '../../services/http.service'
import { getCurrentStockPriceForAllSymbols } from '../../services/redstone.service'
import LoadingScreen from '../loadingScreen/LoadingScreen'
import StockCards from '../stockCards/StockCards'
import './HomePage.css'

export default function HomePage() {

    const { activeUser } = useContext(UserContext)

    const [isLoading, setIsloading] = useState(true)
    const [stockArray, setstockArray] = useState([])

    const [activeTrades, reloadActiveTrades] = useFetch(getAllTrades, activeUser?.id, [])
    const [likedStocks, reloadLikedStocks] = useFetch(getAllLikedStocks, activeUser?.id, [])


    useEffect(() => {
        getPriceForCards()

    }, [])

    async function getPriceForCards() {
        let stock = await getCurrentStockPriceForAllSymbols()
        setstockArray(stock)
        setIsloading(false)
    }


    return (
        <div>

            <div className='h1-wrapper reveal-text'>
                <h1>Stocktopus</h1>
            </div>

            {!isLoading && <h3>Featured Stocks</h3>}

            {isLoading
                ? <LoadingScreen />
                : <div className='liked-stocks'>
                    {stockArray?.map((fav, i) => (
                        <StockCards
                            key={fav?.symbol}
                            value={fav?.value}
                            symbol={fav?.symbol}
                            activeTrades={activeTrades}
                            likedStocks={likedStocks}
                        />
                    ))}
                </div>
            }

            {!isLoading && <button
                className='secondary reload'
                onClick={() => {
                    setIsloading(true);
                    getPriceForCards()
                }}>
                reload
            </button>}

        </div>
    )
}
