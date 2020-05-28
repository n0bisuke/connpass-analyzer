'use strict';
//グループ延べ人数
const axios = require('axios');
const reducer = (accumulator, currentValue) => accumulator + currentValue;

//延べ参加人数計測用 - ページごと
const _getPageTotalPeople = (group_url, page = 1) => {
    const rule = `<span class="amount"><span( class="amount_over")?>(.*?)<\/span>\/`;
    const regexp_g = new RegExp(rule, 'g');
    const regexp = new RegExp(`>(.*?)<\/span>`);

    return axios.get(`${group_url}/event?page=${page}`).then(res => {
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

const getTotalPeople = async (group_url, page = 1, tmpdata = [], prev_count = []) => {
    let c = 0;

    while(1){
        const res = await _getPageTotalPeople(group_url, page);
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

module.exports = (group_url) => {
    return getTotalPeople(group_url);
}