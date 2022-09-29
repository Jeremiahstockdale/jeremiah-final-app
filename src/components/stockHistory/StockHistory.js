import React, { useEffect, useState } from 'react'
import { useBoolean } from '../../hooks/useBoolean';
import { getSixMonthStockHistory } from '../../services/redstone.service'
import LoadingScreen from '../loadingScreen/LoadingScreen';
import Chart from './Chart';
import './ChartStyles.css'

export default function StockHistory({ symbol }) {

    const [stock, setStock] = useState()

    const [isLoading, toggleIsLoading] = useBoolean(true)

    var chart_width
    window.screen.width <= 500 ? chart_width = 250 : chart_width = 500
    var chart_height = chart_width * 3 / 5;


    useEffect(() => {
        getData();
        setTimeout((toggleIsLoading(), 3000))
    }, [])

    async function getData() {
        let data = await getSixMonthStockHistory(symbol); //  59 days with yesterday as the end date
        setStock(data)
        console.log(data, 'stockhistory')
    }


    return (
        <div className={'stock-history-root' + (window.screen.width <= 500 ? ' mobile' : ' desktop')}>

            {!stock || isLoading
                ? <div className='load-main'>
                    <LoadingScreen />
                </div>
                : <Chart
                    data={stock}
                    width={chart_width}
                    height={chart_height}
                />
            }

        </div>
    )
}
