'use strict';

const axios = require('axios');

const getUniqMemberCount = require('./src/getUniqMemberCount.js');
const getEventCount = require('./src/getEventCount.js');
const getPresentationCount = require('./src/getPresentationCount.js');
const getTotalMemberCount = require(`./src/getTotalMemberCount.js`);
const getNextEventsInfo = require(`./src/getNextEventsInfo.js`);

// class キーワードで Polygon を定義
class Connpass {
    constructor(group_url,date) {
      this.group_url = group_url;
      this.date = date;
    }
    _get(){}
    
    //グループメンバー数
    getUniqMemberCount = () => getUniqMemberCount(this.group_url);
    //イベント開催数
    getEventCount = () => getEventCount(this.group_url);
    //登壇資料数
    getPresentationCount = () => getPresentationCount(this.group_url);
    //延べ参加人数
    getTotalMemberCount = async () => getTotalMemberCount(this.group_url);
    //次回開催イベント情報
    getNextEventsInfo = () => getNextEventsInfo(this.group_url);

    // 検索イベント数
    getSearchCount(){
        return axios.get(this.group_url).then(res => {
            const d = res.data.match(/  <h2 class="main_h2">検索結果 \((.*?)件\)<\/h2>/)[1];
            // console.log(d);
            return Number(d);
        });
    }

    // 検索イベントリスト表示
    getSearchList(){
        let page_num = 1;
        return axios.get(this.group_url).then(res => {
            const d = res.data.match(/  <h2 class="main_h2">検索結果 \((.*?)件\)<\/h2>/)[1];
            // console.log(d);
            if (Number(d) > 0) {
                if (Number(d) > 10) {
                    page_num = Math.floor(Number(d) / 10) + 1;
                }
                for (let i=1; i <= page_num; i++){
                    this._getSearchList(i);
                }
            }
            return Number(d);
        });
    }

    _getSearchList(page){
        return axios.get(`${this.group_url}&page=${page}`).then(res => {
            const lines = res.data.split(/\n/);
            const size = lines.length;
            const maxWidth = size.toString().length;
            lines
                .map((line, index) => [(index + 1).toString().padStart(maxWidth, " "), line])
                .filter(lineWithIndex => lineWithIndex[1].search(`event_title`) > -1)
                .forEach(lineWithIndex => {
                    const name = lineWithIndex[1].match(/      <p class="event_title"><a class="url summary" href=".*?">(.*?)<\/a><\/p>/)[1];
                    const url = lineWithIndex[1].match(/      <p class="event_title"><a class="url summary" href="(.*?)">.*?<\/a><\/p>/)[1];
                    console.log(`${this.date}, ${name}, ${url}`);
                });
        });
    }

    // メソッド area()
    area() { return this.width * this.height; }

    hello(){
        console.log('aaa')
    }
}

module.exports = Connpass;
