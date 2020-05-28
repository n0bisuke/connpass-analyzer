'use strict';

//イベント情報を1件取得
module.exports = (html) => {
    const c = {};
    let tmp = '';
    
    //参加人数
    tmp  = html.match(/<span class="amount">(.*?)<\/span>/)[1];
    c.currentAttendee = tmp.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');

    //参加可能上限人数
    if(html.match(/<\/span>\/(.*?)<\/span>人/)){
        c.attendeeLimit  = html.match(/<\/span>\/(.*?)<\/span>人/)[1];
    }else{
        c.attendeeLimit  = c.currentAttendee;
        c.currentAttendee = ''; //connpass外での参加登録
    }

    c.location = html.match(/<span class="icon_place">(.*?)<\/span>/)[1].trim();

    c.title = html.match(/alt="(.*?)"/)[1];

    //日時
    tmp = html.match(/<\/span>(.*?)<span class="dtstart">/)[1].trim();
    const date = tmp.split(`/`);
    c.date = {
        all: tmp,
        yaer: date[0],
        month: date[1],
        day: date[2].split('（')[0],
        week: date[2].match((/（(.*?)）/))[1],
        startTime: date[2].match((/） (.*?)〜/))[1],
    }

    c.url = html.match(/href="(.*?)"/)[1];
    c.imageUrl = html.match(/src="(.*?)"/)[1];
    
    return c;
}