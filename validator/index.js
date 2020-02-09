exports.createPostValidator = (req, res, next) => {
  // title
  req.check('title', 'Write your title').notEmpty();
  req.check('title', 'Title must be between 4 to 150 characters').isLength({
    min: 4,
    max: 150
  });
  // body
  req.check('body', 'Write your post').notEmpty();
  req.check('body', 'Post must be between 4 to 2000 characters').isLength({
    min: 4,
    max: 150
  });

  // check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({ error: firstError });
  }
  next();
};

exports.userSignupValidator = (req, res, next) => {
  req.check('name', 'Name is required').notEmpty();
  req
    .check('email', 'Email must be between 4 and 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must contain the @ symbol')
    .isLength({
      min: 4,
      max: 32
    });
  req.check('password', 'Password is required').notEmpty();
  req
    .check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number');
  // check for errors
  const errors = req.validationErrors();
  if (errors) {
    const firstError = errors.map(error => error.msg)[0];
    return res.status(400).json({
      error: firstError
    });
  }
  next();
};
