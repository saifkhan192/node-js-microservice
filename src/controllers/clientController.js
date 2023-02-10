const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler')
const { OAuthRequired, resolveUser } = require('../middlewares/jwtAuth')

router.get('/', asyncHandler(async (req, res) => {
    const clients = await req.app.locals.clientRepository.getClients();
    res.status(200).sendJson({ clients });
}));

router.get('/:clientId', asyncHandler(async (req, res) => {
    const { clientId } = req.params;
    const client = await req.app.locals.clientRepository.getById(clientId);
    res.status(200).sendJson({ client });
}));

router.patch('/:clientId', asyncHandler(async (req, res) => {
    const { clientId } = req.params;
    const updates = {
        name: req.body.name,
        email: req.body.email,
    }
    const result = await req.app.locals.clientRepository.updateById(clientId, updates);
    // const client = await req.app.locals.clientRepository.getById(clientId);
    res.status(200).sendJson({});
}));

module.exports = router;
