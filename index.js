'use strict';

const axios = require('axios');
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// class キーワードで Polygon を定義
class Connpass {
    constructor(group_url,date) {
      this.group_url = group_url;
      this.date = date;
    }

    _get(){

    }

    //グループメンバー数
    getMemberCount(){
        return axios.get(this.group_url).then(res => {
            const c = res.data.match(/（<span class="amount">(.*?)<\/span>人）/)[1];
            // console.log(c);
            return Number(c);
        });  
    }

    //イベント数
    getEventCount(){
        return axios.get(this.group_url+'/event').then(res => {
            const c = res.data.match(/<h3 class="title">イベント（(.*?)件）<\/h3>/)[1];
            // console.log(c);
            return Number(c);
        });
    }

    //登壇資料数
    getPresentationCount(){
        return axios.get(this.group_url+'/presentation').then(res => {
            const c = res.data.match(/<h3 class="title">資料（(.*?)件）<\/h3>/)[1];
            // console.log(c);
            return Number(c);
        });
    }

    //延べ参加人数
    async getTotalPeople(page = 1, tmpdata = [], prev_count = []){
        let c = 0;

        while(1){
            const res = await this._getPageTotalPeople(page);
            tmpdata.push(res.c);

            process.stdout.write('.');
            // console.log(res.c, page, '|',prev_count.join(','), res.c_array.join(','));
    
            if(prev_count.join(',') !== res.c_array.join(',')){//前回と同じ内容だったら終了
                prev_count = res.c_array;
                page++;
                continue;
            }else{
                tmpdata.pop();
                c = tmpdata.reduce(reducer);
                // console.log(tmpdata, c);
                break;
            }
       }

       return c;
    }

    //延べ参加人数計測用 - ページごと
    _getPageTotalPeople(page = 1){
        const rule = `<span class="amount"><span( class="amount_over")?>(.*?)<\/span>\/`;
        const regexp_g = new RegExp(rule, 'g');
        const regexp = new RegExp(`>(.*?)<\/span>`);

        return axios.get(`${this.group_url}/event?page=${page}`).then(res => {
            const items = res.data.match(regexp_g);
            const counts = items.map(item => {
                const res = item.replace('<span class="amount"><span', '')
                            .match(regexp)[1];
                return Number(res);
            });
            const c = counts.reduce(reducer);
            // console.log(items, counts);
            // console.log(counts.reduce(reducer));
            return {c:c, c_array:counts};
        });
    }

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
