//1.  Ստեղծել homework իրադարձությունը լսող , որը կկանչի handler :
// handler-ը պետք է արտածի Homeworks.txt պարունակությունը: emit անել homework :
const {EventEmitter} = require('events');
const fs = require('fs');

const customEventObject = new EventEmitter();

customEventObject.on('request', (writeStream) => {
    const readable = fs.createReadStream('./homeworks/homework22/Homework.txt', 'utf-8');
    // readable.on('data', (chunk) => {
    //     console.log(chunk.toString());
    // });
    readable.pipe(writeStream);
});

module.exports = customEventObject;
