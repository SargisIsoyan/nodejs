//2.Server-ում ունենք sunny.txt ֆայլ: Ստեղծել սերվեր, որին հարցում ուղարկելիս եթե կա query-ի մեջ file դաշտը և այն հավասար է "sunny",
// որպես response ստանա sunny.txt պարունակությունը այլապես 404 status-ով ստանա "File Not Found". (Օգտագործել Get մեթոդը):
const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    const reqUrl = new URL(req.url, 'http://localhost:3000');
    if (reqUrl.searchParams.get('file') === 'sunny'){
        fs.createReadStream('./sunny.txt').pipe(res);
    } else {
        res.writeHead(404);
        res.end('File NOt Found');
    }
}).listen(3000);
