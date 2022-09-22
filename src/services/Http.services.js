// const axios = require("axios");
const URL = 'https://eodhistoricaldata.com/api';
const API_KEY = 'demo';


// Note: the free version of this website only allows AAPL but I am coding it as if there 
// were more stocks to choose from


// functions to format the dates needed in future CRUD requests
let today = new Date();

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

function lastWeekDate(date) {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
}

function lastMonthDate(date) {
    return new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
}

function lastYearDate(date) {
    return new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
}


// getting historical data from the eodhistocialdata.com api for the line graphs
function getWeekHDByTicker(ticker) {
    return axios.get(`${URL}/eod/${ticker}.US?from=${formatDate(lastWeekDate(today))}&to=${today}&period=d&fmt=json&api_token=${API_KEY}`)
    // return `${URL}/eod/${ticker}.US?from=${formatDate(lastWeekDate(today))}&to=${formatDate(today)}&period=d&fmt=json&api_token=demo`
}

function getMonthHDByTicker(ticker) {
    return axios.get(`${URL}/eod/${ticker}.US?from=${formatDate(lastMonthDate(today))}&to=${today}&period=d&fmt=json&api_token=${API_KEY}`)
    // return `${URL}/eod/${ticker}.US?from=${formatDate(lastMonthDate(today))}&to=${formatDate(today)}&period=d&fmt=json&api_token=demo`
}

function getYearHDByTicker(ticker) {
    return axios.get(`${URL}/eod/${ticker}.US?from=${formatDate(lastYearDate(today))}&to=${today}&period=d&fmt=json&api_token=${API_KEY}`)
    // return `${URL}/eod/${ticker}.US?from=${formatDate(lastYearDate(today))}&to=${formatDate(today)}&period=d&fmt=json&api_token=demo`
}


// getting the "live" stock data for display from eodhistoricaldata.com
function getStockByTicker(ticker) {
    return axios.get(`${URL}/real-time/${ticker}.US?fmt=json&api_token=${API_KEY}`)
    // return `${URL}/real-time/${ticker}.US?fmt=json&api_token=demo`
}

// getting the options contracts stock data for display from eodhistoricaldata.com
function getOptionsByTicker(ticker) {
    return axios.get(`${URL}/options/${ticker}.US?api_token=${API_KEY}`)
    // return `${URL}/options/${ticker}.US?api_token=demo`
}




// local
// getLikedStocks, getSavedOptions
// postNewLikedStock, postNewSavedOptions
// deleteLikedStockById, deleteSavedOptions
// not doing put




e


// these only work on AAPL

// options
// https://eodhistoricaldata.com/api/options/AAPL.US?api_token=demo


// stocks historical
// https://eodhistoricaldata.com/api/eod/AAPL.US?from=2022-01-05&to=2022-08-30&period=d&fmt=json&api_token=demo


// stock current (delayed)
// https://eodhistoricaldata.com/api/real-time/AAPL.US?fmt=json&api_token=demo
