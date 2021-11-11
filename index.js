const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    let newRecipe = {
      title: "Curry Rice",
      level: "Easy Peasy",
      cuisine: "Indian",
    };
    return Recipe.create(newRecipe);
  })
  .then((newRecipe) => {
    console.log(newRecipe.title);
  })

  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((data) => {
    console.log(data);
  })

  .then(() => {
    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((update) => {
    console.log("Successfully updated", update);
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then((deleted) => {
    console.log("Successfully deleted", deleted);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .then(() => {
    console.log("db disconnected");
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
