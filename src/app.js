import express from "express";
import bodyParser from "body-parser";
import expressSession from "express-session";

const app = express();

app.use(express.static("../public"));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: "CST2120_CW2",
    cookie: { maxAge: 36288000 },
    resave: false,
    saveUninitialized: false,
  })
);

export default app;
