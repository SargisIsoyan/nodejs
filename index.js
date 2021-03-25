const https = require('https');
const http = require('http');
const url = require('url');
const fs = require('fs');

const {Readable, Writable} = require('stream');

const readable = new Readable({
    read(size) {
        this.push("filic kardatss");
    }
});

function createReadStream() {
    return new Readable({
        read(size) {

            this.push("filic kardatss");
        }
    });
}

const server = http.createServer((req, res) => {
    // console.log(req.url);
    // for(let key in req.headers){
    //     console.log("headers key:value  is  " + key+ ":"+req.headers[key]);
    // }
    res.setHeader('Content-Type', 'application/json');
    //
    // const urlData = url.parse(req.url, true);
    // console.log(urlData.query.user);


    // res.statusCode = 404;
    // res.end(req.method);

    // fs.createReadStream('./image.jpg', {highWaterMark: 2}).on('data', (chunk)=>{
    //     res.write(chunk);
    // });

    res.end(JSON.stringify({user: "Sargis"}));

});

server.listen(3000);
