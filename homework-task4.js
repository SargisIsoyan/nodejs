const fs = require('fs').promises;

async function createFiles(dirName, arr) {
    await fs.mkdir('./' + dirName);

    const promises = [];
    for (let item of arr) {
        promises.push(fs.writeFile('./' + dirName + '/' + item + '.' + item, item));
    }
    console.log(promises);
    await Promise.all(promises);
}

createFiles('web', ['html', 'css', 'js', 'txt']).then().catch(err => console.error('err', err));
