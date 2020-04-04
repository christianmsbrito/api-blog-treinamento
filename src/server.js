require('dotenv').config();

const Database = require('./_shared/databasa/mongo.connector.js');

Database.connect();

const App = require('./app');

const port = process.env.PORT || 3777

App.listen(port);