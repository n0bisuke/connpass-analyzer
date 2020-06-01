'use strict';
//グループIDを取得 from topPageHtml

module.exports = (topPageHtml) => {
    const groupId = topPageHtml.match(/\/\/connpass.com\/series\/(.*?)\//)[1];
    return Number(groupId);
}