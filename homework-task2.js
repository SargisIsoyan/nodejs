// 2. Գրել ծրագիր որ նախորդ առաջադրանքի կողմից ստեղծված ֆայլ կանվանափոխի
// այդ պահի ամիս, օր, ժամ, րոպեով, վայրկյանով (Օրինակ 10_11_15_32_13.txt):
const fs = require('fs');
const os = require('os');

const userName = os.userInfo().username;
const dateNow = new Date();
fs.rename('./' + userName + '.json', dateNow.getHours() + '_' + dateNow.getMinutes() + '.txt', (err) => {
    if (err) {
        return;
    }
    console.log('done');
});
