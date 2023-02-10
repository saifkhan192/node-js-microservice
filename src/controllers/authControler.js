const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post('/signup', asyncHandler(async (req, res) => {
  const body = req.body;
  const newUser = req.app.locals.models.User({
    name: body.name,
    email: body.email,
    role: body.role,
    password: bcrypt.hashSync(body.password, 8)
  });

  let user = await newUser.save();

  res.status(200).sendJson({ user });
}));

router.post('/signin', asyncHandler(async (req, res) => {
  const body = req.body;
  const user = await req.app.locals.models.User.findOne({
    email: body.email
  });

  if (!user) {
    return res.status(404).send({
      message: "User Not found"
    });
  }

  const passwordIsValid = bcrypt.compareSync(
    body.password,
    user.password
  );

  if (!passwordIsValid) {
    return res.status(401).sendJson({
      message: "Invalid Password!"
    });
  }

  const jwtPayload = {
    id: user.id,
    authId: user.id,
    email: user.email,
  };
  const token = jwt.sign(jwtPayload, process.env.API_SECRET, {
    expiresIn: 86400
  });

  res.status(200).sendJson({
    user: {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
    accessToken: token,
  });

}));

module.exports = router;
