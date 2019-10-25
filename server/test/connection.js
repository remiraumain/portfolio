require('dotenv').config();
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');

//ES6 Promise
mongoose.Promise = global.Promise;

//Connect to the db before tests run
before( async () => {
    //Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_KEY, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(
        () => {
            console.log('Successfully connected to MongoDB Atlas');
        }
    ).catch(
        () => {
            console.log('Unable to connect to MongoDB Atlas');
            console.error(error);
        }
    );
});

// Drop the projects collection before each test
beforeEach( async () => {
   // Drop the collection
    await mongoose.connection.collections.projects.drop(() => {
        console.log('Collection projects dropped')
    });
});