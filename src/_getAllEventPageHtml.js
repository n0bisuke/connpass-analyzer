'use strict';

//全イベントリストページのHTML
const axios = require('axios');
let allPageHtml = '';

module.exports = async (group_url, page=1) => {
    let oldPage = '';
    console.time('timer1');
    while(1){
        // const res = await axios.get(`${group_url}/event?page=${page}`);
        // let newPage = res.data
        //             .replace(/\r?\n/g,"")
        //             .match(/class="group_inner">(.*?)<div id="side_area"/)[1];
        const res = await axios.all([
            axios.get(`${group_url}/event?page=${page}`),
            axios.get(`${group_url}/event?page=${page++}`)
        ]);
         
        let newPage = res[0].data
                            .replace(/\r?\n/g,"")
                            .match(/class="group_inner">(.*?)<div id="side_area"/)[1];
        console.log(res[1].data);
        newPage += res[1].data
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
    console.timeEnd('timer1');
    return allPageHtml;
}

// // module.exports = async (group_url, page=1) => {
// //     // let oldPage = '';
// //     console.time('timer1');
// //     for (let i = 1; i < 28; i++) {
// //         const res = await axios.get(`${group_url}/event?page=${page}`);
// //         allPageHtml += res.data;
// //         process.stdout.write('.');
// //         page++;
// //     }
// //     console.timeEnd('timer1');
// //     // return allPageHtml;
// // }



// module.exports = async (group_url, page=1) => {
//     // let oldPage = '';
//     console.time('timer1');
//     let result = [];
//     for (let i = 1; i < 28; i++) {
//         result.push(axios.get(`${group_url}/event?page=${page}`));
//         page++;
//     }
    
//     const res = await Promise.all(result);
//     console.log(res.data);
//     console.timeEnd('timer1');
//     // return allPageHtml;
// }
