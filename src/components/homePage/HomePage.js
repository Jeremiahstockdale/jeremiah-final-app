import React, { useContext, useEffect, useState } from 'react'
import rd3 from 'react-d3-library'
import { UserContext } from '../../App'
import { useFetch } from '../../hooks/useFetch'
import { getAllLikedStocks, getAllTrades } from '../../services/http.service'
import { getCurrentStockPriceForAllSymbols } from '../../services/redstone.service'
import LoadingScreen from '../loadingScreen/LoadingScreen'
import StockCards from '../stockCards/StockCards'

export default function HomePage() {

    const { activeUser } = useContext(UserContext)

    const [isLoading, setIsloading] = useState(true)

    const [activeTrades, reloadActiveTrades] = useFetch(getAllTrades, activeUser?.id, [])
    const [likedStocks, reloadLikedStocks] = useFetch(getAllLikedStocks, activeUser?.id, [])

    const [stockArray, setstockArray] = useState([])


    useEffect(() => {
        getPriceForCards()

    }, [])


    async function getPriceForCards() {
        let stock = await getCurrentStockPriceForAllSymbols()
        setstockArray(stock)
        setIsloading(false)
        console.log(stock)
    }


    return (
        <div>
            <h1>Stocktopus</h1>


            <h3>Featured Stocks</h3>
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
            <button
                className='secondary'
                onClick={() => {
                    setIsloading(true);
                    getPriceForCards()
                }}>
                reload
            </button>
        </div>
    )
}
