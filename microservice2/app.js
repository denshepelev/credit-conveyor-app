import express from "express";
import axios from "axios";



const app = express();
const port = 5000;

app.use(express.json());



app.post("/", async (req, res) => {
  const result = await axios.post('http://localhost:4000/user', req.body)
    res.json(result.data);
  } );

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
