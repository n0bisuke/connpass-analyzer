'use strict';

// const axios = require('axios');
const getMemberCount = require('./src/getMemberCount.js');
const getEventCount = require('./src/getEventCount.js');
const getPresentationCount = require('./src/getPresentationCount.js');
const getTotalPeople = require(`./src/getTotalPeople.js`);

// class キーワードで Polygon を定義
class Connpass {
    constructor(group_url) {
      this.group_url = group_url;
    }
    _get(){}
    
    //グループメンバー数
    getMemberCount = () => getMemberCount(this.group_url);
    //イベント開催数
    getEventCount = () => getEventCount(this.group_url);
    //登壇資料数
    getPresentationCount = () => getPresentationCount(this.group_url);
    //延べ参加人数
    getTotalPeople = async () => getTotalPeople(this.group_url);

    // メソッド area()
    area() { return this.width * this.height; }

    hello(){
        console.log('aaa')
    }
}

module.exports = Connpass;