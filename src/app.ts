import express from "express";
//import offerRouter from "./routers/offer.router";
//import calculationRouter from "./routers/calculation.router";
import conveyorRoute from "./routes/conveyor.route";
const app = express();
const port = 3000;

app.use(express.json());

app.use("/conveyor", conveyorRoute);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
