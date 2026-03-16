const dotenv = require("dotenv");
dotenv.config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors')
connectToMongo();
const app = express();


const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));
console.log("Mongo URI:", process.env.MONGO_URI);
app.get("/", (req, res) => {
  res.send("iNotebook backend is running 🚀");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



