const { random, internet } = require("faker");

const LIMIT = 1000;

module.exports = () => {
  const data = { mealPlan: [], recipes: [], categories: [], users: [] };
  const categories = [
    { name: "desserts", priorityLevel: 2 },
    { name: "starters", priorityLevel: 0 },
    { name: "main courses", priorityLevel: 1 },
  ];

  for (let i = 0; i < 100; i++) {
    data.users.push({
      id: i,
      email: internet.email(),
      password: internet.password(),
    });
  }

  for (let i = 0; i < 100; i++) {
    data.mealPlan.push({
      id: i,
      usersId: random.number({ min: 0, max: LIMIT }),
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

  for (let i = 0; i < LIMIT * 5; i++) {
    data.recipes.push({
      id: i,
      usersId: random.number({ min: 0, max: LIMIT }),
      name: random.word(),
      categories: random.arrayElement(categories).name,
      ingredients: random
        .words(random.number({ min: 2, max: 10 }))
        // https://github.com/Marak/faker.js/blob/master/lib/random.js
        .split(" "),
    });
  }

  return data;
};
