const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

// const firstRecipe = {
//   title: 'Recipe1',
//   level: 'Super easy',
//   ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
//   cuisine: "developer's diet",
//   dishType: 'Soup',
//   image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
//   duration: 15,
//   creator: 'A hungry dev',
//   created: { type: Date, default: Date.now },
// };

// Recipe.create(firstRecipe)
//   .then(Recipe => console.log('The user is saved and its value is: ', Recipe.title))
//   .catch(error => console.log('An error happened while saving a new user:', error));

Recipe.insertMany(data)
  .then(data.forEach(recipes => console.log('The user is saved and its value is: ', recipes.title)))
  .catch(error => console.log('An error happened while saving a new user:', error));
