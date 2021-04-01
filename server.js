const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const router = require('./router');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
global.__homedir = __dirname;

router(app);
mongoose.connect('mongodb://localhost/nodejs', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    app.listen(2021);
});

// http.createServer(app).listen(2021);
