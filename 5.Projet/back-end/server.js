require('dotenv-safe').config()
const morgan = require('morgan')            // An HTTP request logger middleware for Node.js
const compression = require('compression')  // Node.js compression middleware
const cors = require('cors')                // CORS providing a middleware that can be used to enable CORS with various
                                            // options
const express = require('express')          // Fast, unopinionated, minimalist web framework for Node.js
const bodyParser = require('body-parser')   // Node.js body parsing middleware
const helmet = require('helmet')            // Helmet helps you secure your Express apps by setting various HTTP headers
const passport = require('passport')        // Passport is Express-compatible authentication middleware for Node.js
const i18n = require('i18n')                // Lightweight simple translation module with dynamic JSON storage
const path = require('path')                // Provides utilities for working with file and directory paths

const DROP_DB = true; // For development only

// Configurations files
const db = require('./app/models')
// const initMongo = require('./config/mongo')

// Initiate the app
const app = express()

// Setup express server port from ENV or from default: 3000
app.set('port', process.env.PORT || 3000)

// Access-Control-Allow-Headers
app.use(cors({ origin: true }));
app.options('*', cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade')

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Redis cache enabled by env variable
if (process.env.USE_REDIS === 'true') {
    const getExpeditiousCache = require('express-expeditious')
    const cache = getExpeditiousCache({
        namespace: 'expresscache',
        defaultTtl: '1 minute',
        engine: require('expeditious-engine-redis')({
            redis: {
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT
            }
        })
    })
    app.use(cache)
}

// Parsing json
app.use(bodyParser.json({ limit: '20mb' }))

// Parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

// Translations
i18n.configure({
    locales: ['en', 'fr'],
    directory: `${__dirname}/locales`,
    defaultLocale: 'en',
    objectNotation: true
})
app.use(i18n.init)

// Init all other stuff
app.use(passport.initialize({}))
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.use(require('./app/routes'))

// Init MongoDB
// initMongo()

// Init Sequelize
db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    .then(function () {
        return db.sequelize.sync(
            { force: DROP_DB } // On dev, drop and re-sync db
        ).then(() => {
            if (DROP_DB)
                require('./data') // Load initial db data
            app.listen(app.get('port'))
        });
    })
    .then(function () {
        return db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
    })
    .then(function () {
        console.log('Database synchronised.');
    }, function (err) {
        console.log(err);
    });

module.exports = app
