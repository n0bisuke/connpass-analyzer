'use strict';
 
const Connpass = require('../index.js');
const prefectures = ["hokkaido", "aomori", "iwate", "miyagi", "akita", "yamagata", "fukushima", "ibaraki", "tochigi", "gunma", "saitama", "chiba", "tokyo", "kanagawa", "yamanashi", "nagano", "niigata", "toyama", "ishikawa", "fukui", "gifu", "shizuoka", "aichi", "mie", "shiga", "kyoto", "osaka", "hyogo", "nara", "wakayama", "tottori", "shimane", "okayama", "hiroshima", "yamaguchi", "tokushima", "kagawa", "ehime", "kochi", "fukuoka", "saga", "nagasaki", "kumamoto", "oita", "miyazaki", "kagoshima", "okinawa", "online"];
const i = 47;  // 0 => hokkaido, 1 => aomori, .. , 47 => online
const start_date = '2020%2F03%2F15';  // start date of search. format is YYYY%2FMM%2FDD. YYYY => year, %2F => URL encoded '/', MM => month, %2F => URL encoded '/', DD => day
const end_date = '2020%2F03%2F16';  // end date of search. format is YYYY%2FMM%2FDD. YYYY => year, %2F => URL encoded '/', MM => month, %2F => URL encoded '/', DD => day
const search = new Connpass(`https://connpass.com/search/?q=&start_from=${start_date}&start_to=${end_date}&prefectures=${prefectures[i]}&selectItem=${prefectures[i]}`);

(async () => {
    const cd = {}; // community data

    cd.name = prefectures[i];
    cd.event = await search.getSearchCount();
    console.log(cd);
})();

