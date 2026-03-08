import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());


let recipes = [
  {
    id: 1,
    name: "Seafood boil",
    cuisine: "American",
    prepTime: "45 mins"
  },
  {
    id: 2,
    name: "Pizza",
    cuisine: "Italian",
    prepTime: "25 mins"
  },
  {
    id: 3,
    name: "Guacamole",
    cuisine: "Mexican",
    prepTime: "10 mins"
  }
];


app.get("/recipes", (req, res) => {
  res.json(recipes);
});


app.get("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  res.json(recipe);
});

app.post("/recipes", (req, res) => {
  const { name, cuisine, prepTime } = req.body;

  if (!name || !cuisine || !prepTime) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newRecipe = {
    id: recipes.length + 1,
    name,
    cuisine,
    prepTime
  };

  recipes.push(newRecipe);

  res.status(201).json({
    message: "Recipe added successfully",
    recipe: newRecipe
  });
});


app.put("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  const { name, cuisine, prepTime } = req.body;

  if (name) recipe.name = name;
  if (cuisine) recipe.cuisine = cuisine;
  if (prepTime) recipe.prepTime = prepTime;

  res.json({
    message: "Recipe updated successfully",
    recipe
  });
});


app.delete("/recipes/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const recipe = recipes.find(r => r.id === id);

  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }

  recipes = recipes.filter(r => r.id !== id);

  res.json({
    message: "Recipe deleted successfully",
    deletedRecipe: recipe
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});