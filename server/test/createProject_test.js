const assert = require('assert');
const request = require('supertest');
const app = require('../app');

const filePath = [
    `${__dirname}/files/logo.jpg`,
    `${__dirname}/files/logo_animation.mp4`
];


let token = null;

describe('Post / endpoint', () => {

    before( async () => {
        const authRes = await request(app)
            .post('/auth/login')
            .send({ email: process.env.LOGIN_EMAIL, password: process.env.LOGIN_PWD });
        token = authRes.body.token;
    });

    it('Create a new post to the database', async () => {
        const res = await request(app)
            .post('/projects/')
            .set("Content-Type", "multipart/form-data")
            .set('Authorization', 'Bearer ' + token)
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

        assert(res.statusCode === 201);
    })
});
