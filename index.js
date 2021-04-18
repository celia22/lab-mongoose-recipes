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
  // .then(self => {
  //   console.log(`Connected to the database: "${self.connection.name}"`);
  //   // Before adding any documents to the database, let's delete all previous entries
  //  // return self.connection.dropDatabase();
  // })
  .then(() => {
    console.log(`Connected to the database"`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const firstRecipe = {
  title: 'Recipe1',
  level: 'Super easy',
  ingredients: ['ingredient1', 'ingredient2', 'ingredient3'],
  cuisine: "developer's diet",
  dishType: 'Soup',
  image: 'https://images.media-allrecipes.com/images/75131.jpg',
  duration: 15,
  creator: 'A hungry dev',
};
// const promise1 = Recipe.create(firstRecipe)
//   .then(Recipe => console.log('The user is saved and its value is: ', Recipe.title))
//   .catch(error => console.log('An error happened while saving a new user:', error));

// const promise2 = Recipe.insertMany(data)
//   .then(data.forEach(recipes => console.log('The recipe title is: ', recipes.title)))
//   .catch(error => console.log('An error happened while saving a new user:', error));

const promise3 = Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 }, { new: true })
  .then(console.log('Recipe duration updated'))
  .catch(error => console.log('An error happened while upating recipe', error));

const promise4 = Recipe.deleteOne({ title: 'Carrot Cake' })
  .then(console.log('Carrot Cake deleted'))
  .catch(error => console.log('An error happened while deleteing the recipe', error));

Promise.all([promise3, promise4])
  .then(() => {
    mongoose.connection.close();
    console.log('mongoose to be closed');
  })
  .catch(err => console.error(err));


  mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));