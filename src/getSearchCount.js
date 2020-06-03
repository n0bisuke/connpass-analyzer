'use strict';
// 検索イベント数

module.exports = (searchCountPageHtml) => {
    const d = searchCountPageHtml.match(/  <h2 class="main_h2">検索結果 \((.*?)件\)<\/h2>/)[1];
    return Number(d);
}

