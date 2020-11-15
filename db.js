const { random, internet } = require("faker");
const { v4: uuid } = require("uuid");

const LIMIT = 1000;
const categories = ["starters", "main courses", "desserts"];

module.exports = () => ({
  mealPlan: Array(100).fill({
    id: uuid(),
    usersId: random.number({ min: 0, max: LIMIT }),
    recipesId: random.number({ min: 0, max: LIMIT }),
    weekday: random.number({ min: 0, max: 7 }),
  }),
  recipes: Array(LIMIT * 5).fill({
    id: uuid(),
    usersId: random.number({ min: 0, max: LIMIT }),
    name: random.word(),
    categories: random.arrayElement(categories),
    ingredients: random
      .words(random.number({ min: 2, max: 10 }))
      // https://github.com/Marak/faker.js/blob/master/lib/random.js
      .split(" "),
  }),
  categories: categories.map((name, index) => ({
    id: uuid(),
    name,
    priorityLevel: index,
  })),
  users: [
    {
      id: uuid(),
      email: "user@gmail.com",
      password: "security",
    },
    ...Array(100).fill({
      id: uuid(),
      email: internet.email(),
      password: internet.password(),
    }),
  ],
});
