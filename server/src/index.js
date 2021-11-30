const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); /// giao tiep vs FE
const app = express();
require('dotenv').config();
const db = require('./config/connectDB/index');
const route = require('./routing/index');
const path = require('path');
const port = process.env.PORT || 5000 ;
db.connectDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // su dung 
route(app);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});