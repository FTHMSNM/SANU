const express = require("express");
const helmet = require('helmet');
var compression = require('compression')
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var cors = require("cors");
var path = require("path");
const { engine } = require('express-handlebars');
const app = express();

const adminRoute = require("./routes/v1/admin")

app.use(compression())
app.use(cookieParser());
app.use(helmet());
app.use(helmet({ crossOriginEmbedderPolicy: false, originAgentCluster: true }));
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https: data: blob:"],
            "frame-src": ["'self'", "https: data: blob:"]
        },
    })
);
app.use(
    session({
        secret: "keyboard cat",
        resave: true,
        saveUninitialized: true,
        cookie: { secure: false },
    })
);
app.use(bodyParser.json({ limit: "20MB" }));
app.use(bodyParser.urlencoded({ limit: "20MB", extended: true }));
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use("/", adminRoute);

app.get("/ping", (req, res) => {
    console.log("PING")
    res.json({
        status: "OK",
        time: new Date().toTimeString(),
        msg: "SERVER IS UP AND RUNNING"
    })
});

module.exports = app;
