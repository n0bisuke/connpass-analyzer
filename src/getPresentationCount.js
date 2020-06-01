'use strict';
//グループプレゼン件数 from topPageHtml
module.exports = (topPageHtml) => {
    const c = topPageHtml.match(/connpass.com\/presentation\/">（(.*?)件）<\/a>/)[1];
    return Number(c);
}