'use strict';
//次回開催予定のイベント情報を全て取得 form topPageHtml
const _getEventInfo = require(`./_getEventInfo`); //イベント情報を1件取得

module.exports = (topPageHtml) => {
    const html = topPageHtml.replace(/\r?\n/g,"");
    //次回イベントリスト
    const nextEventHtml = html.match(/<div class="open_event_area group_box">(.*?)<div class="group_box">/)[1];
    const nextEventsHtmlArr = nextEventHtml.match(/class="group_event_list vevent clearfix"(.*?)<\/span>人/g);

    let resultData = [];
    for (let i = 0, len = nextEventsHtmlArr.length; i < len; i++) {
        resultData[i] = _getEventInfo(nextEventsHtmlArr[i]);          
    }

    // console.log(resultData);
    return resultData;
}

