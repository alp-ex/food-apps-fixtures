const jsonServer = require("json-server");
const bodyParser = require("body-parser");
const { sign, verify } = require("jsonwebtoken");
const { v4: uuid } = require("uuid");
const db = require("./db");

const data = db();
const server = jsonServer.create();
const router = jsonServer.router(data);
const middlewares = jsonServer.defaults();

const SECRET_KEY = "123456789"; // nope
const expiresIn = "1h";

function createToken(payload) {
  return sign(payload, SECRET_KEY, { expiresIn });
}

function verifyToken(token) {
  return verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

function isAuthenticated({ email, password }) {
  return (
    data.users.findIndex(
      (user) => user.email === email && user.password === password
    ) !== -1
  );
}

server.use(middlewares);
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (!isAuthenticated({ email, password })) {
    data.users.push({
      id: uuid(),
      email,
      password,
    });
  }

  const access_token = createToken({ email, password });

  res.status(200).json({ access_token });
});

server.use(/^(?!\/auth).*$/, (req, res, next) => {
  if (
    req.headers.authorization === undefined ||
    req.headers.authorization.split(" ")[0] !== "Bearer"
  ) {
    const status = 401;
    const message = "Bad authorization header";

    res.status(status).json({ status, message });

    return;
  }

  try {
    verifyToken(req.headers.authorization.split(" ")[1]);
    next();
  } catch (err) {
    const status = 401;
    const message = "Error: access_token is not valid";

    res.status(status).json({ status, message });
  }
});

server.use(
  jsonServer.rewriter({
    "/meal-plan": "/mealPlan?_expand=recipes",
    "/meal-plan/:id": "/mealPlan/:id?_expand=recipes",
    "/meal-plan?weekday=:weekday": "/mealPlan?_expand=recipes&weekday=:weekday",
    "/recipes": "/recipes?_sort=name",
    "/categories": "/categories?_sort=priorityLevel",
  })
);

server.use(router);

server.listen(3001, "0.0.0.0", () => {
  console.log("Success !");
});
