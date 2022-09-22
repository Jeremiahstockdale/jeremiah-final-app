import React from 'react'
import rd3 from 'react-d3-library'

export default function HomePage() {

    const LineChart = rd3.LineChart;


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
