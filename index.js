const { random } = require("faker");

const LIMIT = 1000;

module.exports = () => {
  const data = { mealPlan: [], recipes: [], categories: [] };
  const categories = [
    { name: "desserts", priorityLevel: 2 },
    { name: "starters", priorityLevel: 0 },
    { name: "main courses", priorityLevel: 1 },
  ];

  for (let i = 0; i < 100; i++) {
    data.mealPlan.push({
      id: i,
      recipesId: random.number({ min: 0, max: LIMIT }),
      weekday: random.number({ min: 0, max: 7 }),
    });
  }

  categories.forEach(({ name, priorityLevel }, id) => {
    data.categories.push({
      id,
      name,
      priorityLevel,
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
