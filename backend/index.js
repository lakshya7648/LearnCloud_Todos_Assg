const express = require('express');
var cors = require('cors');
const connectToDatabase = require("./config/dbConnection");

const app = express();
connectToDatabase();

const port = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());
app.use("/api/todos", require("./routes/todos"));

app.listen(port, () => {
  console.log(`Todos-backend app listening on port ${port}`)
})