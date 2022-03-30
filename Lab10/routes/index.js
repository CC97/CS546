const loginRoutes = require('./login');
const signupRoutes = require('./signup');
const privateRoutes = require('./private');
const path = require('path');
//const session = require('express-session');

const constructorMethod = (app) => {
  app.set('views', path.join(__dirname, '../views'));

  
  app.get('/', (req, res) => {
    if(req.session.user){
      return res.redirect('/private');
  }
    res.render('login', {document_title: 'login'});
  })
  app.get('/logout', async (req, res) => {
    req.session.destroy();
    res.clearCookie('AuthCookie');
    res.render('logout');
  });
  app.use('/signup', signupRoutes);
  app.use('/login', loginRoutes);
  app.use('/private', privateRoutes);
  
  

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found' });
  });
};

module.exports = constructorMethod;