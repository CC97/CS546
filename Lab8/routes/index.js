const charactersRoutes = require('./characters');
const singleRoutes = require('./singleCharacter');
const path = require('path');

const constructorMethod = (app) => {
  
  app.set('views', path.join(__dirname, '../views'));
  
  app.get('/', async (req, res) => {
    res.render('home', {document_title: "Character Finder"});
  })
  app.use('/search', charactersRoutes);
  app.use('/characters', singleRoutes);
  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Not found!' });
  });
  
};




module.exports = constructorMethod;
