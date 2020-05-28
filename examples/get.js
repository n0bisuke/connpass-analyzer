'use strict';
 
const Connpass = require('connpass-analyzer');
const prefectures = ["hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima", "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa", "yamanashi", "nagano", "niigata", "toyama", "ishikawa", "fukui", "gifu", "shizuoka", "aichi", "mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama", "tottori", "shimane", "okayama", "hiroshima", "yamaguchi", "tokushima", "kagawa", "ehime", "kochi", "fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa", "online"]
const test = [ "online", "tokyo"];
const date = '2020%2F03%2F16';

// for (let i = 0; i < test.length; i++) {
(async () => {
  for (let i = 0; i < prefectures.length; i++) {
//    const search = new Connpass(`https://connpass.com/search/?q=&start_from=${date}&start_to=${date}&prefectures=${test[i]}&selectItem=${test[i]}`);
    const search = new Connpass(`https://connpass.com/search/?q=&start_from=${date}&start_to=${date}&prefectures=${prefectures[i]}&selectItem=${prefectures[i]}`);
    const cd = {}; // community data
//    cd.name = test[i];
    cd.name = prefectures[i];
    cd.event = await search.getSearchCount();
    await sleep(1000);
//    console.log("i="+i);
    console.log(cd);
  }
})();
 
function sleep(waitSec) {
    return new Promise(function (resolve) {
        setTimeout(function() { resolve() }, waitSec);
    });
} 

