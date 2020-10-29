const { fake } = require("faker");
const faker = require("faker");

const LIMIT = 1000;

module.exports = () => {
  const data = { plannedRecipe: [], recipe: [], category: [] };
  const categories = ["desserts", "starters", "main courses"];

  for (let i = 0; i < LIMIT; i++) {
    data.plannedRecipe.push({
      id: i,
      recipeId: faker.random({ max: LIMIT }),
      weekday: faker.random({ max: 6 }),
    });
  }

  categories.forEach((category) => {
    data.category.push({
      id: i,
      name: category,
    });
  });

  for (let i = 0; i < LIMIT; i++) {
    data.recipe.push({
      id: i,
      name: faker.random.word(),
      category: faker.random.arrayElement(categories),
      ingredients: faker.random
        .words(faker.random.number({ min: 2, max: 10 }))
        // https://github.com/Marak/faker.js/blob/master/lib/random.js
        .split(" "),
    });
  }

  return data;
};
