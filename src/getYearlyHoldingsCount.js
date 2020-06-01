'use strict';

//年ごとのイベント回数 from this.allEventsInfo
module.exports = (allEventsInfo) => {
    const list = allEventsInfo;
    let resultData = {};
    for (let i = 0, len = list.length; i < len; i++) {
        const year = list[i].date.yaer;

        if(year in resultData){
            resultData[year]++; //1UP
        }else{
            resultData[year] = 1; //初期化
        }
    }

    return resultData;
}
