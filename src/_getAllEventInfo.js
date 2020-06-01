'use strict';

//全イベント情報 from allPageHTML

const _getEventInfo = require(`./_getEventInfo`); //1件取得

module.exports = (allPageHtml) => {
    const eventsHtmlArr = allPageHtml.match(/class="group_event_list vevent clearfix"(.*?)<\/span>人/g);
    // console.log(eventsHtmlArr, eventsHtmlArr.length);

    let resultData = [];
    for (let i = 0, len = eventsHtmlArr.length; i < len; i++) {
        resultData[i] = _getEventInfo(eventsHtmlArr[i]);          
    }

    return resultData;
}
