'use strict';
//グループイベント件数 from topPageHtml

module.exports = (topPageHtml) => {
    const c = topPageHtml.match(/">全てのイベントを見る（(.*?)件）<\/a>/)[1];
    return Number(c);
}

