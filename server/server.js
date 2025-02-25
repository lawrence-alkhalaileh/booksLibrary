import express from "express";
import cors from "cors";
import router from "./routes/home.js";

const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port, () => {
  console.log(`app is listening to port ${port}`);
});
