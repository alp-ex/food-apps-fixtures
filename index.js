const { random } = require("faker");

const LIMIT = 1000;

module.exports = () => {
  const data = { plannedRecipe: [], recipe: [], category: [] };
  const categories = ["desserts", "starters", "main courses"];

  for (let i = 0; i < LIMIT; i++) {
    data.plannedRecipe.push({
      id: i,
      recipeId: random.number({ max: LIMIT }),
      weekday: random.number({ max: 6 }),
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
      name: random.word(),
      category: random.arrayElement(categories),
      ingredients: random
        .words(random.number({ min: 2, max: 10 }))
        // https://github.com/Marak/faker.js/blob/master/lib/random.js
        .split(" "),
    });
  }

  return data;
};
