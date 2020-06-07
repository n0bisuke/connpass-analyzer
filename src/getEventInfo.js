'use strict';
//イベント単体の情報 from eventid

const axios = require('axios');

module.exports = async (EventId) => {
    const EVENT_URL = `https://connpass.com/api/v1/event/?event_id=${EventId}`;
    const res = await axios.get(EVENT_URL);
    const event = res.data.events[0];
    const str = event.description;
    const description_text = str.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'');
    const result = event;
    result.description_text = description_text;
    // console.log(result);
    return result;
}

