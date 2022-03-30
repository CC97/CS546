
const express = require('express');
const app = express();
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');
const session = require('express-session');

const static = express.static(__dirname + '/public');
app.use('/public', static);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true,
        //cookie: { maxAge: 60000 }
    })
);

app.use(async (req, res, next) => {
    let authenticated = ''
    if(req.session.user)
        authenticated = 'Authenticated User';
    else
        authenticated = 'Non-Authenticated User';
    console.log(new Date().toUTCString(), req.method, req.originalUrl, authenticated);
    next();
});

app.use('/private', (req, res, next) => {
    if(!req.session.user){
        return res.status(403).render('unlogin', {document_title: 'unlogin'});
    }
    else{
        next();
    }
});
  /*
  app.use('/', (req, res, next) => {
    if(req.session.user){
        return res.redirect('/private');
    }
    else{
        //return res.render('login', {document_title: 'login'});
        next();
    }
  });
  
  app.use('/private', (req, res, next) => {
    if(!req.session.user){
        return res.status(403).render('unlogin', {document_title: 'unlogin'});
    }
    else{
        next();
    }
});

  app.use('/signup', (req, res, next) => {
    if(req.session.user){
        return res.redirect('/private');
    }
    else{
        next();
    }
});
*/
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
})