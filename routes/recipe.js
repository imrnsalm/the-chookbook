const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET recipes listing. */
router.get('/all', (req, res, next) => {
  db.all('SELECT * FROM recipe', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500);
      res.send("500 Internal Server Error")
      return;
    }
    req.recipes = rows;

    db.all('SELECT * FROM ingredient', (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500);
        res.send("500 Internal Server Error")
        return;
      }
      req.ingredients = rows;

      db.all('SELECT * FROM instruction', (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500);
            res.send("500 Internal Server Error")
            return;
        }
        req.instructions = rows;

        let data = {};
        req.recipes.forEach(recipe => data[recipe.name] = { ingredients: [], instructions: {} });
        req.ingredients.forEach(ingredient => data[ingredient.recipe_name].ingredients.push(ingredient.ingredient_description));
        req.instructions.forEach(instruction => data[instruction.recipe_name].instructions[instruction.instruction_number] = instruction.instruction_description);
        
        res.header("Content-Type", 'application/json');
        res.status(200);
        res.send(JSON.stringify(data, null, 2));
      });
    });
  });
});

module.exports = router;
