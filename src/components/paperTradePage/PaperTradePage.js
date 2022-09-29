import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../App'
import { useFetch } from '../../hooks/useFetch'
import { getAllLikedStocks, getAllTrades } from '../../services/http.service'
import { getCurrentStockPrice } from '../../services/redstone.service'
import LoadingScreen from '../loadingScreen/LoadingScreen'
import StockCards from '../stockCards/StockCards'
import './PaperTradePage.css'

export default function PaperTradePage() {

    const { activeUser } = useContext(UserContext)

    const [activeTrades, reloadActiveTrades] = useFetch(getAllTrades, activeUser?.id, [])
    const [likedStocks, reloadLikedStocks] = useFetch(getAllLikedStocks, activeUser?.id, [])

    const [isLoading, setIsloading] = useState(true)
    const [tradesArray, setTradesArray] = useState([])
    const [myStockSymbols, setmyStockSymbols] = useState([])

    const [start, end] = startEndValues()

    var percentGain = ((end - start) / end * 100)?.toFixed(2)
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })
    var difference = formatter?.format(end - start)
    var screenWidth = window.screen.width;


    useEffect(() => {
        let stocksSymbols = []
        for (let i = 0; i < activeTrades.length; i++) {
            stocksSymbols.push(activeTrades[i].stock_symbol)
        }

        getPriceForCards(stocksSymbols)
        setmyStockSymbols(stocksSymbols)
    }, [activeTrades])

    useEffect(() => {
        startEndValues()
    }, [tradesArray])

    async function getPriceForCards(symbols) {
        let stock = await getCurrentStockPrice(symbols)
        setTradesArray(stock)
        setIsloading(false)
    }

    function startEndValues() {
        let start = activeUser?.account_value;
        let end = activeUser?.account_value;
        let orderedTrades = []

        for (let i = 0; i < activeTrades.length; i++) {
            const element = activeTrades[i];
            start += element.init_investment_value;

            for (let j = 0; j < tradesArray?.length; j++) {
                const trade = tradesArray[j];
                if (trade.symbol == element.stock_symbol) {
                    end += (Number(trade.value) * Number(element.shares));
                    orderedTrades.push(trade)
                    break;
                }
            }
        }

        return [start, end]
    }

    return (
        <div className={'paper-trade-page-root ' + (screenWidth <= 500 && 'mobile')}>

            <h2>Your Portfolio</h2>

            {activeTrades.length == 0
                && <h3>
                    You don't have any paper trades
                </h3>
            }

            {end != activeUser?.account_value
                && <div className='value-wrapper'>

                    <div>
                        <h2 className='money '>{formatter.format(end)}</h2>
                        <p className={'start-money ' + (percentGain < 0 && 'negative')}>({percentGain > 0
                            ? '+' + difference
                            : difference
                        })</p>
                    </div>

                    <div>
                        <h2 className={'percent ' + (percentGain < 0 && 'negative')}>
                            {percentGain > 0
                                ? '+' + percentGain + '%'
                                : percentGain + '%'
                            }
                        </h2>
                    </div>

                </div>
            }

            {isLoading
                ? <LoadingScreen />
                : <div className='liked-stocks'>
                    {tradesArray?.map((fav, i) => (
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
                    getPriceForCards(myStockSymbols)
                }}>
                reload
            </button>

        </div>
    )
}
