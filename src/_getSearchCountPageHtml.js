'use strict';
//SearchPageのHTMLを取得 from group_url
const axios = require('axios');

module.exports = (group_url) => {
    return axios.get(group_url).then(res => res.data);
}
