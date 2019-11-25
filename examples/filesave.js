'use strict';

const fs = require("fs");
const Connpass = require('../index.js');
const groupname = 'enebular';
const community = new Connpass(`https://${groupname}.connpass.com/`);

(async () => {
    const c = {};

    c.name = groupname;
    c.event = await community.getEventCount();
    c.presentation = await community.getPresentationCount();
    c.presentationPerEvent = c.presentation / c.event; //1回あたりの登壇数平均
    c.uniq_member = await community.getMemberCount();
    c.total_member = await community.getTotalPeople();
    c.new_rate = c.uniq_member / c.total_member; //新規率

    /**
     * データ更新処理
     * */
    const PATH = "./data/connpass.json";
    const readTxt = fs.readFileSync(PATH, 'utf8');
    const communityData = JSON.parse(readTxt);
    communityData[groupname] = c; //新規 or 更新

    console.log(communityData);

    fs.writeFileSync(PATH, JSON.stringify(communityData));
})();