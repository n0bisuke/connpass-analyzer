'use strict';
//グループイベント件数
const axios = require('axios');

module.exports = (group_url) => {
    return axios.get(group_url+'/event').then(res => {
        const c = res.data.match(/<h3 class="title">イベント（(.*?)件）<\/h3>/)[1];
        // console.log(c);
        return Number(c);
    });
}

