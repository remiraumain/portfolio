const assert = require('assert');
const request = require('supertest');
const app = require('../app');

const filePath = [
    `${__dirname}/files/logo.jpg`,
    `${__dirname}/files/logo_animation.mp4`
];


describe('Get / endpoint', () => {


    beforeEach(async () => {
        const randomNum = Math.floor(Math.random() * Math.floor(10));

        for(let i = 0; i < randomNum; i++) {
            const res = await request(app)
                .post('/projects/')
                .set("Content-Type", "multipart/form-data")

                .field(
                    {
                        title: 'test is cool',
                        description: 'test',
                        date: Date.now(),
                        projectUrl: 'www.test.com',
                    }
                )
                .attach('files', filePath[0])
                .attach('files', filePath[1]);
        }
    });


    it('Get all projects from the database', async () => {
        const res = await request(app)
            .get('/projects/');
        //console.log('Number of projects : ' + res.body.length);
        assert(res.statusCode === 200);
    })
});