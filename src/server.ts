import app from './app';
import CLog from './library/CLog';
import { config } from './config/config';
import connectMongo from './library/Mongo';

let server;
connectMongo()
    .then(() => {
        server = app.listen(config.server.port, () => {
            CLog.info(`The server has started @ port:${config.server.port}`);
        });
    })
    .catch((error) => {
        CLog.error('Unable to connect:');
        CLog.error(error);
    });
