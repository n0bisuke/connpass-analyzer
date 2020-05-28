'use strict';
//グループメンバー数
const axios = require('axios');

module.exports = (group_url) => {
    return axios.get(group_url).then(res => {
        const c = res.data.match(/（<span class="amount">(.*?)<\/span>人）/)[1];
        // console.log(c);
        return Number(c);
    });
}