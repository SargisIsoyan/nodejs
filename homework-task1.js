//1.Գրել ծրագիր, որը կստուգի , եթե req.url /sunny է, ապա console-ում տպի Yes.
const http = require('http');

http.createServer((req, res) => {
    if (req.url === '/sunny') {
        console.log('yes');
    }
    res.end('test');
}).listen(3000);
