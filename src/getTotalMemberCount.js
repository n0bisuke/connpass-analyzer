'use strict';

//グループ延べ人数 from allEventsInfo
module.exports = (allEventsInfo) => {
    const list = allEventsInfo;
    let resultCount = 0;
    for (let i = 0, len = list.length; i < len; i++) {
        resultCount += Number(list[i].currentAttendee);
    }
    return resultCount;
}