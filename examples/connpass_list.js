'use strict';
 
const Connpass = require('../index.js');
var dateformat = require('dateformat');

const prefectures = ["hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima", "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa", "yamanashi", "nagano", "niigata", "toyama", "ishikawa", "fukui", "gifu", "shizuoka", "aichi", "mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama", "tottori", "shimane", "okayama", "hiroshima", "yamaguchi", "tokushima", "kagawa", "ehime", "kochi", "fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa", "online"]
// const test = [ "online", "tokyo"];
const test = [ "online"];

// let date = '2020/05/11';
let date = dateformat(new Date(), 'yyyy/mm/dd');
// console.log(date);

if (process.argv.length > 2){
  date = process.argv[2];
  console.log(date);
}

(async () => {

  // for (let i = 0; i < prefectures.length; i++) {
  for (let i = 0; i < test.length; i++) {

    const cd = {}; // community data

    const URL = `https://connpass.com/search/?q=&start_from=` + encodeURIComponent(`${date}`) + `&start_to=` + encodeURIComponent(`${date}`) + `&prefectures=${test[i]}&selectItem=${test[i]}`;
    // const URL = `https://connpass.com/search/?q=&start_from=` + encodeURIComponent(`${date}`) + `&start_to=` + encodeURIComponent(`${date}`) + `&prefectures=${prefectures[i]}&selectItem=${prefectures[i]}`;
    // console.log(URL);

    const search = new Connpass(URL,date);

    // cd.name = prefectures[i];
    cd.name = test[i];

    cd.event = search.getSearchList();
    await sleep(500);
    // console.log(cd);
  }
})();
 
function sleep(waitSec) {
    return new Promise(function (resolve) {
        setTimeout(function() { resolve() }, waitSec);
    });
} 

