import express from "express";
import offerRouter from "./routers/offer.router";
import calculationRouter from "./routers/calculation.router";
const app = express();
const port = 3000;

app.use(express.json());
app.use("/", offerRouter);
app.use("/", calculationRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
