import React from 'react'
import rd3 from 'react-d3-library'

export default function HomePage() {

    const LineChart = rd3.LineChart;

    // LineChart given data in the format {"date","value"} (will be  last 7 days profit)
    // to  get "value" we need to get all stock names  in trades  where  user Id =  foo
    // then  use  GetHistoricalPrice and send in  ["TSLA", "BTC"...] (active trades) 4 times for the
    // last 4 trading days. then one GetPrice  with the  same names for today
    // then add account_value + sum of (stock "x" price  *  shares owned  of  stock "x") to get "value"
    // date will come from the 5 Get...Price functions


    return (
        <div>
            HomePage
            <br />
            Chart with your paper trades || 'you havent made any trades yet'

            <br />
            current paper trades with stock cards to the right of the Chart
        </div>
    )
}
