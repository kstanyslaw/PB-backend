var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  res.status(201).json({
    token: email + '_' + password
  })
})

module.exports = router;
