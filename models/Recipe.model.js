const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  level: String,
  ingredients: Array,
  cuisine: String,
  dishType: String,
  image: { type: String, default: 'https://images.media-allrecipes.com/images/75131.jpg' },
  duration: Number,
  creator: String,
  created: { type: Date, default: Date.now },

});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
