'use strict';
//次回開催予定のイベント情報を全て取得
const axios = require('axios');

//イベント情報を1件取得
const getEventInfo = (html) => {
    const c = {};
    c.currentAttendee  = html.match(/<span class="amount"><span>(.*?)<\/span>/)[1];
    c.attendeeLimit  = html.match(/<\/span>\/(.*?)<\/span>人/)[1];
    c.location = html.match(/<span class="icon_place">(.*?)<\/span>/)[1].trim();
    c.title = html.match(/alt="(.*?)"/)[1];
    c.date = html.match(/<\/span>(.*?)<span class="dtstart">/)[1].trim();
    c.url = html.match(/href="(.*?)"/)[1];
    c.imageUrl = html.match(/src="(.*?)"/)[1];
    return c;
}

module.exports = (group_url) => {
    return axios.get(group_url).then(res => {
        const html = res.data.replace(/\r?\n/g,"");

        //次回イベントリスト
        const nextEventHtml = html.match(/<div class="open_event_area group_box">(.*?)<div class="group_box">/)[1];
        const nextEventsHtmlArr = nextEventHtml.match(/class="group_event_list vevent clearfix"(.*?)<\/span>人/g);

        let resultData = [];
        for (let i = 0, len = nextEventsHtmlArr.length; i < len; i++) {
            resultData[i] = getEventInfo(nextEventsHtmlArr[i]);          
        }

        // console.log(resultData);
        return resultData;
    });
}

