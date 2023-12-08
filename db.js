const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.exec(`
    CREATE TABLE IF NOT EXISTS recipe (
        name TEXT NOT NULL PRIMARY KEY,
        UNIQUE(name)
    );
    CREATE TABLE IF NOT EXISTS ingredient (
        recipe_name TEXT NOT NULL,
        ingredient_description TEXT NOT NULL,
        FOREIGN KEY (recipe_name)
            REFERENCES recipe (name)
    );
    CREATE TABLE IF NOT EXISTS instruction (
        recipe_name TEXT NOT NULL,
        instruction_number INTEGER NOT NULL,
        instruction_description TEXT NOT NULL,
        FOREIGN KEY (recipe_name)
            REFERENCES recipe (name)
    );`, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
    }
);

db.exec(`
    INSERT INTO recipe (name)
        VALUES ("Soft Boiled Eggs");

    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Soft Boiled Eggs", "large egg(s), chilled");

    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Soft Boiled Eggs", 1, "Add 1 inch of water to a sauce pot, cover, and bring to a boil over high heat.");
    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Soft Boiled Eggs", 2, "Once boiling, add an egg (or however many you'd like as long as they are in a single layer in a bottom of the pot), straight from the refridgerator into the pot. Replace the lid and let it continue to boil for exactly six minutes.");
    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Soft Boiled Eggs", 3, "After six minutes, remove the egg(s) from the pot and place them in an ice water bath or run under cool water until they are cool enough to handle. Peel, and enjoy!");
        

    INSERT INTO recipe (name)
        VALUES ("Air Fryer Chicken Wings");

    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1 lb chicken wings");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1 tsp coarse salt");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1 tsp baking powder");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1 tsp cornstarch");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1/2 tsp garlic powder");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1/2 tsp smoked paprika");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1/4 tsp onion powder");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1/8 tsp black pepper");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Air Fryer Chicken Wings", "1/8 tsp cooking oil for greasing");
    
    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Air Fryer Chicken Wings", 1, "Pat the chicken wings dry with a paper towel. Make sure to get as much moisture off the skin as possible.");
    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Air Fryer Chicken Wings", 2, "Mix 1 teaspoon of salt with 1 teaspoon of baking powder per pound of chicken. Toss the dried chicken wings in this mixture until evenly coated. Place the wings on a rack set over a sheet pan and refridgerate for at least one hour.");
    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Air Fryer Chicken Wings", 3, "Remove the wings from the fridge and pat them dry a second time. Mix the cornstarch, garlic powder, smoked paprika, onion powder, and black pepper called for in the recipe for every pound of chicken. Toss the wings in this mixture until thoroughly coated.");
    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Air Fryer Chicken Wings", 4, "Grease the air fryer basket and preheat it to 300°F. Arrange the wings in a single layer, making sure they do not touch. Cook for 15 minutes.");
    INSERT INTO instruction (recipe_name, instruction_number, instruction_description)
        VALUES ("Air Fryer Chicken Wings", 5, "Flip the wings over, raise the temperature of the air fryer to 450°F, and cook for 10 minutes. Use a meat thermometer to make sure the wings have an internal temperature of 165°F before serving.");
    `, (err) => {
        if (err) {
            console.error(err.message);
            return;
        }
    }
);

module.exports = db;
