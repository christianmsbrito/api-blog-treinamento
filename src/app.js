const Koa = require('koa');

const routesLoader = require('./routes/index.route');
const morgan = require('koa-morgan');

const bodyParser = require('koa-body');
const cors = require('@koa/cors');

class App {
    constructor() {
        this.koa = new Koa();

        this.middlerwares();
        this.routes();
    }

    middlerwares() {
        this.koa.use(morgan('dev'));
        this.koa.use(cors());
        this.koa.use(bodyParser({ extended: false }));
    }

    routes() {
        routesLoader.load(this.koa);
    }
}

module.exports = new App().koa;