import express from "express";
import bodyParser from "body-parser";

import router from "./routes/routes.js";

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(bodyParser.json());

app.use("/films", router);

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});

export default app;
