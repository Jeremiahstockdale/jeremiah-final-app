import React, { useEffect, useState } from 'react'
import { getSixMonthStockHistory } from '../../services/redstone.service'
import Chart from './Chart';

import './ChartStyles.css'

export default function StockHistory({ symbol }) {
    // load historical data

    const [stock, setStock] = useState()
    const chart_width = 500;
    const chart_height = 300;

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        let data = await getSixMonthStockHistory(symbol); //  59 days with yesterday as the end date
        setStock(data)
        console.log(data, 'stockhistory')
    }

    // display historical data
    return (
        <div>
            {stock && <Chart data={stock} width={chart_width} height={chart_height} />}
        </div>
    )
}
