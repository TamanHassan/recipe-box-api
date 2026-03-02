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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});