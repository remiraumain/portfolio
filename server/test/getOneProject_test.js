const assert = require('assert');
const request = require('supertest');
const app = require('../app');

const filePath = [
    `${__dirname}/files/logo.jpg`,
    `${__dirname}/files/logo_animation.mp4`
];

let id = '';
let token = null;

describe('Get /:id endpoint', () => {

    beforeEach(async () => {
        const authRes = await request(app)
            .post('/auth/login')
            .send({ email: process.env.LOGIN_EMAIL, password: process.env.LOGIN_PWD });
        token = authRes.body.token;

        const randomNum = Math.floor(Math.random() * Math.floor(3));

        for(let i = 0; i < randomNum; i++) {
            await request(app)
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
        }
        const res = await request(app)
            .get(`/projects/`);
        id = res.body[0]._id;
    });


    it('Get one project from the database', async () => {
        const res = await request(app)
            .get(`/projects/${id}`);
        assert(res.statusCode === 200);
    })
});