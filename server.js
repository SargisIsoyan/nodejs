const http = require('http');
const express = require('express');
const router = require('./router');
const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

router(app);

http.createServer(app).listen(2021);
