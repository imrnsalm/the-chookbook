const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET recipes listing. */
router.get('/', (req, res, next) => {
    db.all('SELECT * FROM recipe', (err, rows) => {
        if (err) {
            console.error(err.message);
            return;
        }
        req.recipes = rows;

        db.all('SELECT * FROM ingredient', (err, rows) => {
            if (err) {
                console.error(err.message);
                return;
            }
            req.ingredients = rows;

            db.all('SELECT * FROM instruction', (err, rows) => {
                if (err) {
                    console.error(err.message);
                    return;
                }
                req.instructions = rows;

                recipes = {};
                req.recipes.forEach(recipe => recipes[recipe.name] = { ingredients: [], instructions: {} });
                req.ingredients.forEach(ingredient => recipes[ingredient.recipe_name].ingredients.push(ingredient.ingredient_description));
                req.instructions.forEach(instruction => recipes[instruction.recipe_name].instructions[instruction.instruction_number - 1] = instruction.instruction_description);
                
                res.send(recipes);
            });
        });
    });
});

module.exports = router;
