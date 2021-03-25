//3.Գրել ծրագիր, որը կկարդա homework3.txt ֆայլի պարունակությունը, տեքստից կհեռացնի  ստորակետները
// և կգրի replace.txt ֆայլում, որից հետո ջնջել homework3.txt ֆայլը:
const fs = require('fs');
const {Transform} = require('stream');

// async function removeCommasWithPromises() {
//     const data = await fs.promises.readFile('./homework3.txt');
//     await fs.promises.writeFile('replace.txt', data.toString().replace(/\,/g, ''));
//     await fs.promises.unlink('./homework3.txt');
// }
//
// removeCommasWithPromises().then().catch(err => console.error(err));

function removeCommasWithStreams() {
    const readStream = fs.createReadStream('./replace.txt', {highWaterMark: 1});
    const writeStream = fs.createWriteStream('./replace2.txt');

    // readStream.on('data', (chunk) => {
    //     writeStream.write(chunk.toString().replace(/\,/g, ''));
    // });
    const transform = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().replace(/\,/g, ''));
            callback();
        }
    });

    readStream.pipe(transform).pipe(writeStream);

    writeStream.on('finish', () => {
        fs.unlink('replace.txt', (err) => {
            console.log(err);
        });
    }).on('error', (err) => {
        console.log('write', err);
    });

    readStream.on('end', () => {
        console.log('end');
    }).on('error', (err) => {
        console.log('read', err);
    });
}

removeCommasWithStreams();
