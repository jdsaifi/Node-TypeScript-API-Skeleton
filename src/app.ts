import express from 'express';
import helmet from 'helmet';
import CLog from './library/CLog';

const app = express();

/** Log the request */
app.use((req, res, next) => {
    /** Log the req */
    CLog.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
        /** Log the res */
        CLog.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
    });

    next();
});
///////

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});
///////

/** Routes */
// app.use('/authors', authorRoutes);
// app.use('/books', bookRoutes);
///////

/** Healthcheck */
app.get('/ping', (req, res, next) => res.status(200).json({ working: 'Okay' }));
app.get('/', (req, res, next) => res.send('<h1>Working Okay</h1>'));

/** Error handling */
app.use((req, res, next) => {
    const error = new Error('Not found');

    CLog.error(error);

    res.status(404).json({
        message: error.message
    });
});

export = app;
