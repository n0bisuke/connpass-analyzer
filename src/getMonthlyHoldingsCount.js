'use strict';

//月ごとのイベント回数 from this.allEventsInfo
module.exports = (allEventsInfo) => {
    const list = allEventsInfo;
    let resultData = {};
    for (let i = 0, len = list.length; i < len; i++) {
        const month = list[i].date.yaer + list[i].date.month;

        if(month in resultData){
            resultData[month]++; //1UP
        }else{
            resultData[month] = 1; //初期化
        }
    }

    return resultData;
}
