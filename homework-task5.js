//5.Գրել ծրագիր որ կկարդա Homework5 պապկայի ֆայլերը,
// կստեղծի newDir պապկա և այնտեղ կտեղափոխի այն ֆայլերը իրենց պարունակություններով որոնք 1kB մեծ են :
const fsExtra = require('fs-extra');
const fs = require('fs').promises;

async function moveDir() {
    const files = await fs.readdir('./newDir');
    await fs.mkdir('./nor');

    for (let file of files) {
        const stat = await fs.stat('./newDir/' + file);
        if (stat.isFile() && stat.size > 1) {
            await fs.rename('./newDir/' + file, './nor/' + file);
        }
    }
}

moveDir().catch(err => console.error(err));
