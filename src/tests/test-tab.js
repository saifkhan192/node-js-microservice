'use strict';

const co = require('co');
const test = require('tape');
const request = require('supertest');
const app = require('../../server').app;
const mongo = require('../../server').mongo;

let cleanup_mongo = function(t) {
    co(function*() {
        yield mongo.dropCollection('tabs_collection');
        t.end();
    });
};

test('POST /tabs (create new)', t => {

    let payload = {
        "name": "Disease history",
        "description": "The chronic of the disease at hand",
        "dataPoints": [
            {
                "dataType": "selection",
                "label": "ECOG_SCORE",
                "description": "ECOC score at the start of IO",
                "options": [
                    "0",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "unknown"
                ]
            },
            {
                "dataType": "text",
                "label": "ECOG_HB_LEVEL",
                "placeholder": "g/dL",
                "description": "Hemogolobin level at the start of IO (g/dL)"
            }
        ]
    };

    request(app)
        .post('/tabs')
        .send(payload)
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.error(err);
            }
            t.equal(res.body.code, 201);
            t.end();
        });
});

test('GET /tabs (get tabs)', t => {

    request(app)
        .get('/tabs')
        .send()
        .expect(200)
        .end(function(err, res) {
            if (err) {
                console.error(err);
            }
            t.equal(res.body.code, 200);
            t.assert(res.body.data != undefined);
            t.end();
        });
});

test('Clean up DB', cleanup_mongo);
test.onFinish(() => process.exit(0));