const mogoose = require('mongoose');

class Database {
    static connect() {
        const connectionString = process.env.DATABASE_URL;

        Database.connection = mogoose.createConnection(connectionString, {
            useNewUrlParser: true,
            autoReconnect: true,
            useUnifiedTopology: true
        });
    }

    static get connetion() {
        return Database.connection;
    }
}

module.exports = Database;