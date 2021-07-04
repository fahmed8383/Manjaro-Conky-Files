// import neccesary packages
const axios = require("axios");
const cheerio = require('cheerio');

// list of stocks we want to get info about
const stocks = ['UWMC', 'AC.TO', 'MMNFF']

// main function
async function main() {

    // if we cannot access the internet then this file will print errors into conky.
    // thus exit if cannot access internet.
    await require('dns').resolve('www.google.com', function(err) {
        if (err) {
            console.log("No Internet Access")
            process.exit()
        }
    });

    // loop through all stocks to get their html data and proccess it
    for(i = 0; i < stocks.length; i++){
        html = await getHTMLData('https://finance.yahoo.com/quote/'+stocks[i]);
        await parseHTMLData(html, stocks[i]);
    }
}

// get html page data from the corresponding url
async function getHTMLData(url){
    req = await axios.get(url);
    return req.data;
}

// parses the html data for the corresponding stock and prints out
// stock name, price and daily change in price
async function parseHTMLData(html, stock){
    const $ = cheerio.load(html);

    // get price from html data
    const priceDiv = $('div[data-reactid=31] > span[data-reactid=32]');
    price = $(priceDiv.get(0)).text()

    // get change from html data (remove the change in price and only keep percent change)
    const changeDiv = $('div[data-reactid=31] > span[data-reactid=33]');
    change = $(changeDiv.get(0)).text()
    change = change.substring(change.indexOf("("));

    // display the stock data
    console.log("${font :BOLD:pixelsize=14}"+stock+"${alignr}${font}${font ::pixelsize=14}"+price+" "+change+"${font}");
}

main();