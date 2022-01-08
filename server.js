const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes');
const mongoose = require('mongoose');
const DATABASE_URL = "mongodb://localhost/users";
mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
app.use(cors());
app.use(express.json());
app.use(router);
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.on('connected', () => {
    console.log("connected");
});

app.listen(port = 5000, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})