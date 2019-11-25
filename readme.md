

## sample

```js
'use strict';

const Connpass = require('../index.js');
const groupname = 'iotlt';
const community = new Connpass(`https://${groupname}.connpass.com/`);

(async () => {
    const cd = {}; // community data

    cd.name = groupname;
    cd.event = await community.getEventCount();
    cd.presentation = await community.getPresentationCount();
    cd.presentationPerEvent = cd.presentation / cd.event; //1回あたりの登壇数平均
    cd.uniq_member = await community.getMemberCount();
    cd.total_member = await community.getTotalPeople();
    cd.new_rate = cd.uniq_member / cd.total_member; //新規率

    console.log(cd);
})();
```