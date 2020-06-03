'use strict';

const axios = require('axios');

const getUniqMemberCount = require('./src/getUniqMemberCount.js');
const getEventCount = require('./src/getEventCount.js');
const getPresentationCount = require('./src/getPresentationCount.js');
const getTotalMemberCount = require(`./src/getTotalMemberCount.js`);
const getNextEventsInfo = require(`./src/getNextEventsInfo.js`);
const getMonthlyHoldingsCount = require(`./src/getMonthlyHoldingsCount.js`);
const getYearlyHoldingsCount = require(`./src/getYearlyHoldingsCount.js`);
const getGroupId = require(`./src/getGroupId.js`);
const _getAllEventPageHtml = require(`./src/_getAllEventPageHtml.js`);
const _getTopPageHtml = require(`./src/_getTopPageHtml.js`);
const _getAllEventInfo = require(`./src/_getAllEventInfo.js`);
const getSearchCount = require(`./src/getSearchCount.js`); 
const _getSearchCountPageHtml = require(`./src/_getSearchCountPageHtml.js`);

// class キーワードで Polygon を定義
class Connpass {
    constructor(group_url,date) {
      this.group_url = group_url;
      this.date = date;
      this.topPageHtml = '';
      this.allPageHtml = '';
      this.allEventsInfo = [];
      this.monthlyHoldingsCount = {};
      this.searchCountPageHtml = '';
    }
    _get(){}
    
    //グループID
    async getGroupId() {
        await this._fetchCheckTop();
        return getGroupId(this.topPageHtml);
    };
    //グループメンバー数
    async getUniqMemberCount() {
        await this._fetchCheckTop();
        return getUniqMemberCount(this.topPageHtml);
    }
    //イベント開催数
    async getEventCount() {
        await this._fetchCheckTop();
        return getEventCount(this.topPageHtml);
    }
    //登壇資料数
    async getPresentationCount() {
        await this._fetchCheckTop();
        return getPresentationCount(this.topPageHtml);
    };
    //次回開催イベント情報
    async getNextEventsInfo() {
        await this._fetchCheckTop();   
        return getNextEventsInfo(this.topPageHtml);
    }
    //月間開催数リスト
    async getMonthlyHoldingsCount() {
        await this._fetchCheckAll();
        return getMonthlyHoldingsCount(this.allEventsInfo);
    };
    //年間開催数リスト
    async getYearlyHoldingsCount() {
        await this._fetchCheckAll();
        return getYearlyHoldingsCount(this.allEventsInfo);
    };
    //延べ参加人数
    async getTotalMemberCount() {
        await this._fetchCheckAll();
        return getTotalMemberCount(this.allEventsInfo);
    };

    async _fetchCheckTop() {
        if(this.topPageHtml === ''){
            this.topPageHtml = await _getTopPageHtml(this.group_url);
        }
    }

    async _fetchCheckAll() {
        if(this.allPageHtml === ''){
            // debug用
            // this.allPageHtml = await _getAllEventPageHtml(this.group_url, 26);
            this.allPageHtml = await _getAllEventPageHtml(this.group_url); //全リストページ(connpass.com/event/?page=XX)のHTML
        }

        if(this.allEventsInfo.length === 0){
            this.allEventsInfo = _getAllEventInfo(this.allPageHtml); //全イベント情報
        }
    }

    // 検索イベント数
    async getSearchCount(){
        await this._fetchSearchCount();
        return getSearchCount(this.searchCountPageHtml);
    }

    async _fetchSearchCount() {
        if(this.searchCountPageHtml === ''){
            this.searchCountPageHtml = await _getSearchCountPageHtml(this.group_url);
        }
    }

    // 検索イベントリスト表示
    async getSearchList(){
        let page_num = 1;
        await this._fetchSearchCount();
        const d = getSearchCount(this.searchCountPageHtml);
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
    }

    async _getSearchList(page){
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
