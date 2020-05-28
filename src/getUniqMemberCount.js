'use strict';
//グループメンバー数 from topPageHtml

module.exports = (topPageHtml) => {
    const c = topPageHtml.match(/（<span class="amount">(.*?)<\/span>人）/)[1];
    return Number(c);
}