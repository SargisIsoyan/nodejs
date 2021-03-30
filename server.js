const http = require('http');
const express = require('express');
const router = require('./router');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
global.__homedir = __dirname;

router(app);

app.listen(2021);
// http.createServer(app).listen(2021);
