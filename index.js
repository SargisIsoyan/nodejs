const fs = require('fs');
const {EventEmitter} = require('events');

const readable = fs.createReadStream('users.json');
readable.on('data', (chunk) => {
    console.log(chunk.toString());
});

readable.emit('data', 'first Chunk');
readable.emit('data', 'seee Chunk');
readable.emit('data', 'trrr Chunk');

const customEvent = new EventEmitter();

customEvent.on('data', (number) => {
    console.log('start 1', number);
}).on('data', (number1, number2) => {
    console.log('start 2', number1, number2);
}).on('data2', (...arg) => {
    console.log('start 2', arg);
});

customEvent.emit('data', 10, 20, 30);
customEvent.emit('data2', 10, 20, 30);
