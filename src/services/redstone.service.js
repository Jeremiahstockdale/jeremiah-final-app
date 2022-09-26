const redstone = require('redstone-api');

// get by symbol

export async function getCurrentStockPrice(symbol) {
    try {
        const stock = await redstone.getPrice(symbol)
        // console.log('returning', stock)
        return stock
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

export async function getCurrentStockPriceForAllSymbols() {
    try {
        const stocks = await redstone.getPrice(["AAPL", "TSLA", "AMZN", "DIS", "MSFT", "PINS", "TDOC", "GOOG", "FB", "NFLX", "SHOP", "IBM", "COST", "MA", "NKE", "SPOT"])
        console.log('returning', stocks)
        return stocks
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

// get 6 months data by symbol

export async function getSixMonthStockHistory(symbol) {

    let today = new Date();
    let sixMonthsAgo = new Date(today)

    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 59);
    sixMonthsAgo.setHours(sixMonthsAgo.getHours() - 1); // gets one more bit of data

    let stock = await getHistoricalDataInTimeWindow(symbol, sixMonthsAgo, today)
    // console.log(stock, 'before filter')
    // stock = stock?.filter((day, i) => i % 24 == 0 || i === stock.length - 1)
    // console.log(stock, 'after filter')
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

    // data is array of many items for one day
    // loop thorugh every item

    // find max and min in array
    // the data at hour 9 is open price
    // the data at hour 16 is close price
    // if the item is not the same day as the previous item, 
    // push data (max, min, open, close)
    // reset the values for the next 'day' (24 items)


}

export async function getSixMonthOpenAndCloseData(symbol) {


    let today = new Date();
    let sixMonthsAgo = new Date(today)

    sixMonthsAgo.setDate(sixMonthsAgo.getDate() - 59);
    sixMonthsAgo.setHours(sixMonthsAgo.getHours() - 1); // gets one more bit of data

    let stock = await getHistoricalDataInTimeWindow(symbol, sixMonthsAgo, today)

    // console.log(new Date(stock[0].timestamp).getHours());
    // console.log(new Date(stock[stock.length - 1].timestamp).getHours());
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