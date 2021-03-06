const passport = require('passport');
require('./strategies/local.strategy')();

let redirectUrl = null;

function authenticate(req, res, next) {
  redirectUrl = req.originalUrl;
  if (req.user) {
    next();
  } else {
    res.redirect('/users/not-authorized');
  }
}

function init(app) {
  app.use(passport.initialize());
  app.use(passport.session());

  // stores user in session
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // retrieves user from session
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
}

function getRedirectUrl() {
  return redirectUrl;
}

module.exports = {
  authenticate,
  init,
  getRedirectUrl,
};
