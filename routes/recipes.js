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

                data = {};
                req.recipes.forEach(recipe => data[recipe.name] = { ingredients: [], instructions: [] });
                req.ingredients.forEach(ingredient => data[ingredient.recipe_name].ingredients.push(ingredient.ingredient_description));
                req.instructions.forEach(instruction => data[instruction.recipe_name].instructions.push(instruction.instruction_description));
                
                res.render('recipes', { title: 'Recipes', recipes: data });
            });
        });
    });
});

module.exports = router;
