'use strict';
//グループプレゼン件数
const axios = require('axios');

module.exports = (group_url) => {
    return axios.get(group_url+'/presentation').then(res => {
        const c = res.data.match(/<h3 class="title">資料（(.*?)件）<\/h3>/)[1];
        // console.log(c);
        return Number(c);
    });
}