import express from "express";



const app = express();
const port = 4000;

app.use(express.json());

app.post("/user", async (req, res) => {
    const response  = req.body;
    response.newField = 20;
   res.json(response);
  } );





app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
