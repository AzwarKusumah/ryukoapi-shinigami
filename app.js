const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(require("./router/api"));

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message:
      "This API works!, please report if has any problems darlin❤️' - Ryuko",
  });
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Im Running with u ${port} ❤️`);
});
