const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler')
const { OAuthRequired, resolveUser } = require('../middlewares/jwtAuth')

router.get('/pg', asyncHandler(async (req, res) => {
    const users = await req.app.locals.userRepository.getUsers();
    res.status(200).sendJson({ users });
}));

// Return sample books to react app
router.get('/books', OAuthRequired, resolveUser, asyncHandler(async (req, res) => {
    const books = [
        { id: 1, name: "Harry Potter" },
        { id: 2, name: "Clean Code" },
        { id: 3, name: "Javascript: Good practices" },
    ];
    // console.log(req.locals.jwtToken)
    res.status(200).sendJson({ books });
}));

module.exports = router;
