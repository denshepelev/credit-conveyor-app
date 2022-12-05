import express from "express";
import offerRouter from "./routers/offer.router";
import scoringRouter from "./routers/scoring.router";
const app = express();
const port = 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.post("/conveyor", (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
});
app.use("/", offerRouter);
app.use("/", scoringRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
