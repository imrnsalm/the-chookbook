const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.exec(`
    CREATE TABLE IF NOT EXISTS recipe (
        name TEXT PRIMARY KEY
    );
    CREATE TABLE IF NOT EXISTS ingredient (
        recipe_name TEXT,
        ingredient_description TEXT,
        FOREIGN KEY (recipe_name)
            REFERENCES recipe (name)
    );
    CREATE TABLE IF NOT EXISTS instruction (
        recipe_name TEXT,
        instruction_description TEXT,
        FOREIGN KEY (recipe_name)
            REFERENCES recipe (name)
    );`, (err, tables) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(tables);
    }
);

db.exec(`
    INSERT INTO recipe (name)
        VALUES ("Soft boiled eggs");
    INSERT INTO ingredient (recipe_name, ingredient_description)
        VALUES ("Soft boiled eggs", "1. large egg(s), chilled");
    INSERT INTO instruction (recipe_name, instruction_description)
        VALUES ("Soft boiled eggs", "1. Add 1 inch of water to a sauce pot, cover, and bring to a boil over high heat.
                                     2. Once boiling, add an egg (or however many you'd like as long as they are in a single layer in a bottom of the pot), straight from the refridgerator into the pot. Replace the lid and let it continue to boil for exactly six minutes.
                                     3. After six minutes, remove the egg(s) from the pot and place them in an ice water bath or run under cool water until they are cool enough to handle. Peel, and enjoy!"
    );`, (err, tables) => {
        if (err) {
            console.error(err.message);
            return;
        }
        console.log(tables);
    }
);

module.exports = db;
