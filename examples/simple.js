'use strict';

const Connpass = require('../index.js');
const groupname = 'iotlt';
const community = new Connpass(`https://${groupname}.connpass.com/`);

(async () => {
    const cd = {}; // community data

    cd.name = groupname;
    cd.event = await community.getEventCount(); //イベント総数
    cd.presentation = await community.getPresentationCount(); //プレゼン数
    cd.presentationPerEvent = cd.presentation / cd.event; //1回あたりの登壇数平均
    cd.uniq_member = await community.getUniqMemberCount(); //ユニークメンバー
    cd.total_member = await community.getTotalMemberCount(); //述べ参加人数
    cd.new_rate = cd.uniq_member / cd.total_member; //新規率
    cd.next_events = await community.getNextEventsInfo(); //次回開催イベント情報

    console.log(cd);
})();