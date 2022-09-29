
const redstone = require('redstone-api');

export async function getCurrentStockPrice(symbol) {
    try {
        const data = await redstone.getPrice(symbol)
        console.log('returning', data)
        // if the response is an object with an ID, that means it is
        //  the data for one single stock
        // else it would be a nested object of objects with
        //  multiple stock's data
        if (data.id) {
            return data
        } else {
            let stocks = [];
            for (let symbol in data) {
                let stock = data[symbol]
                stocks.push(stock);
            }
            console.log("output", stocks)
            return stocks;
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

export async function getCurrentStockPriceForAllSymbols() {
    try {

        const data = await redstone.getPrice(["AAPL", "AMZN", "DIS", "MSFT", "PINS", "TDOC", "GOOG", "FB", "NFLX", "SHOP", "IBM", "COST", "MA", "NKE", "SPOT"])

        if (data.id) {
            return data
        } else {
            let stocks = [];
            for (let symbol in data) {
                console.log(symbol)
                let stock = data[symbol]
                stocks.push(stock);
            }
            console.log("returning", stocks)
            return stocks;
        }

    } catch (err) {
        console.log(err);
        return undefined;
    }
}


export async function getSixMonthStockHistory(symbol) {

    let today = new Date();
    let sixMonthsAgo = new Date(today)

    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 59);
    sixMonthsAgo.setHours(sixMonthsAgo.getHours() - 1); // gets one more bit of data

    let stock = await getHistoricalDataInTimeWindow(symbol, sixMonthsAgo, today)


    return stock;

}

/**
 * data:  {
        ...
        timestamp: 1658757563258,
        value: 153.60495
}[]
 * @param {*} data 
 */
export function convertHistoryDataToCandlestickData(data) {

    let dataByDay = [];

    let high = 0;
    let low = Infinity;
    let open, close;
    let currentDay = new Date(data[0].timestamp).getDate();

    for (let i = 0; i < data.length; i++) {


        let hourlyData = data[i];
        let date = new Date(hourlyData.timestamp)

        if (date.getDate() !== currentDay) {

            dataByDay.push({ open, close, low, high });
            high = 0;
            low = Infinity;
            open = 0;
            close = 0;
            currentDay = date.getDate();
        }

        // gets open-close prices for each hour
        if (date.getHours() < 9 || date.getHours() > 16) {
            continue; // skip hours before open and after close
        }

        if (hourlyData.value < low) {
            low = hourlyData.value
        }
        if (hourlyData.value > high) {
            high = hourlyData.value
        }

        if (date.getHours() == 9) {
            open = hourlyData.value;
        } else if (date.getHours() == 16) {
            close = hourlyData.value;
        }

        if (!open) {
            open = low;
        }
        if (close == 0) {
            close = open;
        }

    }

    return dataByDay;

}

export async function getSixMonthOpenAndCloseData(symbol) {


    let today = new Date();
    let sixMonthsAgo = new Date(today)

    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 59);
    sixMonthsAgo.setHours(sixMonthsAgo.getHours() - 1); // gets one more bit of data

    let stock = await getHistoricalDataInTimeWindow(symbol, sixMonthsAgo, today)

    stock = stock?.filter((day, i) => {
        let date = new Date(day.timestamp)
        // if open or close time
        if (date.getHours() === 9 || date.getHours() === 16) {
            return true;
        } else {
            return false
        }
    })
    // if first data point is after open time
    if (new Date(stock[0].timestamp).getHours() === 16) {
        stock.splice(0, 1);
    }
    return stock;
}

export async function getHistoricalDataInTimeWindow(symbol, startDate, endDate) {
    try {
        var stock = await redstone.getHistoricalPrice(symbol, {
            startDate,
            endDate,
            interval: 1000 * 60 * 60, // 1 hour
        });
        console.log('returning', stock)
        return convertHistoryDataToCandlestickData(stock)
        // return stock

    } catch (err) {
        console.log(err);
        return undefined;
    }
}