//3. Server-ում ունենք users.json ֆայլ,
// որը զանգված է կազմված "fisrt_name", "last_name", "email", "age" դաշտեր պարունակող օբյեկտներից ։
// Ստեղծել սերվեր, որին հարցում ուղարկելիս եթե կա query-ի մեջ filter դաշտը , վերադարձնել users.json-ից զանգված միայն այն օբյեկներից ,
// որոնց "fisrt_name" կամ "last_name" պարունակում է filter-ի արժեքը։
const http = require('http');
const users = require('./users.json');
const url = require('url');

http.createServer((req, res) => {
    const reqUrl = new URL(req.url, 'http://localhost:3000');
    const filter = reqUrl.searchParams.get('filter');
    console.log(filter);
    res.writeHead(200, {
        'ContentType': 'application/json'
    })
    if (filter){
        res.end(JSON.stringify(users.filter(user=> {
            return user['first_name'].includes(filter) || user['last_name'].includes(filter);
        })));
    } else {
        res.end(JSON.stringify(users));
    }
}).listen(3000);
