const { random } = require("faker");

const LIMIT = 1000;

module.exports = () => {
  const data = { mealPlan: [], recipes: [], categories: [] };
  const categories = ["desserts", "starters", "main courses"];

  for (let i = 0; i < 100; i++) {
    data.mealPlan.push({
      id: i,
      recipesId: random.number({ min: 0, max: LIMIT }),
      weekday: random.number({ min: 0, max: 7 }),
    });
  }

  categories.forEach((category, i) => {
    data.categories.push({
      id: i,
      name: category,
    });
  });

  for (let i = 0; i < LIMIT; i++) {
    data.recipes.push({
      id: i,
      name: random.word(),
      categories: random.arrayElement(categories),
      ingredients: random
        .words(random.number({ min: 2, max: 10 }))
        // https://github.com/Marak/faker.js/blob/master/lib/random.js
        .split(" "),
    });
  }

  return data;
};
