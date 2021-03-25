//1. Գրել ծրագիր որը կստեղծի ֆայլ Ձեր համակարգչի user անունով և այդ ֆայլում գրել համակարգչի userinfo-ն:
const fs = require('fs');
const os = require('os');
const userInfo = os.userInfo();

fs.writeFile(userInfo.username + '.json', JSON.stringify(userInfo), (err) => {
    if (err) {
        return;
    }
    console.log('done');
});
