
const app = require('express')();
const bodyParser = require('body-parser')
const mongo = require('./db');
const validator = require('./validator');
const config = require('./src/config');

let mongoConfig = {
    uri: config.mongo_uri,
    dbName: config.mongo_db_name,
    params: {'useUnifiedTopology': true},
};

// parse application/json
app.use(bodyParser.json())

app.get('/tabs', async (req, resp)=>{
    try {
        let tabList = await mongo.findAll('tabs_collection', {});
        resp.json({
            message: 'Data loaded successfully!',
            code: 200,
            data: tabList
        });
    } catch (err) {
        resp.json({
            message: err.message,
            code: 500,
            data: []
        });
    }
});

app.post('/tabs', async (req, resp) => {
    let tabData = req.body;

    let errors = validator.validateTab(tabData);
    if (errors) {
        resp.json({
            message: 'Validation failed!',
            code: 400,
            data: errors
        });
    }

    try {
        let insertedId = await mongo.insertOne('tabs_collection', tabData);
        resp.json({
            message: 'Created successfully',
            code: 201,
            data: insertedId
        });
    } catch (err) {
        resp.json({
            message: err.message,
            code: 500,
            data: []
        });
    }
});

app.put('/tabs/:tabId', async (req, resp) => {
    let tabData = req.body;

    let errors = validator.validateTabId(req.params);
    if (errors) {
        resp.json({
            message: 'Validation failed!',
            code: 400,
            data: errors
        });
    }

    errors = validator.validateTab(tabData);
    if (errors) {
        resp.json({
            message: 'Validation failed!',
            code: 400,
            data: errors
        });
    }

    try {
        let isUpdated = await mongo.updateOne('tabs_collection', tabData, req.params.tabId);
        resp.json({
            message: 'Updated successfully',
            code: 200,
            data: isUpdated
        });
    } catch (err) {
        resp.json({
            message: err.message,
            code: 500,
            data: []
        });
    }
});

app.delete('/tabs/:tabId', async (req, resp) => {

    let errors = validator.validateTabId(req.params);
    if (errors) {
        resp.json({
            message: 'Validation failed!',
            code: 400,
            data: errors
        });
    }

    try {
        let result = await mongo.deleteOne('tabs_collection', req.params.tabId);
        resp.json({
            message: 'Deleted successfully!',
            code: 200,
            data: result
        });
    } catch (err) {
        resp.json({
            message: err.message,
            code: 500,
            data: []
        });
    }
});

app.get('/tabStats', async (req, resp)=>{
    try {
        let pipline = [
            { $unwind: '$dataPoints' },
            { $group: { _id: "$_id", datapointCount: { $sum: 1 } } }
        ];
        let result = await mongo.aggregate('tabs_collection', pipline);
        resp.json(result);
    } catch (err) {
        resp.json({
            message: err.message,
            code: 500,
            data: []
        });
    }
});

// 404 errors
app.use((req, resp, next) => {
    resp.json({
        message: 'Route not found!',
        code: 404,
        data: []
    });
});


exports.app = app;
exports.mongo = mongo;

mongo.connect_db(mongoConfig, () => {
    const PORT = process.env.PORT || 8080;
    const HOST = '0.0.0.0';
    if (app.get('env') === 'test') return;
    app.listen(PORT, () => {
        console.log("Application is running: open: http://localhost:8080");
    });
});
