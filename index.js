const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();
const productRoute = require('./routes/productRoute');
const userRoute    = require('./routes/userRoute')
// Express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json())
// Mongoose connection
const db_uri = process.env.DB_URI;
const port = process.env.PORT;
mongoose.connect(db_uri, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => console.log("Listening for port " + port)))
.catch((err) => console.log("Failed to start server" , err));


app.get("/", (req, res) => {
    res.send("Hello World")
})

// Product route
app.use(userRoute)
app.use('/products', productRoute)