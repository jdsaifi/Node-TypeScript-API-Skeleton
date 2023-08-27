import mongoose from 'mongoose';
import { config } from '../config/config';
import CLog from './CLog';

// mongoose events
mongoose.connection.on('connected', function () {
    CLog.log('Mongoose connected');
});

mongoose.connection.on('error', function (err) {
    CLog.error('Mongoose connection has occured error');
    CLog.error(err);
});

mongoose.connection.on('disconnected', function () {
    CLog.warn('Mongoose connection is disconnected');
});

export = () => mongoose.connect(config.mongo.url);
