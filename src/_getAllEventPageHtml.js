'use strict';

//全イベントリストページのHTML
const axios = require('axios');
let allPageHtml = '';

module.exports = async (group_url, page=1) => {
    let oldPage = '';
    
    while(1){
        const res = await axios.get(`${group_url}/event?page=${page}`);
        const newPage = res.data
                            .replace(/\r?\n/g,"")
                            .match(/class="group_inner">(.*?)<div id="side_area"/)[1];
        if(oldPage !== newPage){
            allPageHtml += newPage;
            oldPage = newPage;
            process.stdout.write('.');
            page++;
            continue;
        }else{
            break;
        }
    }

    return allPageHtml;
}