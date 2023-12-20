const express = require("express")
const routes = require("./router/routes")
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
var cors = require('cors');
require("dotenv").config();


const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api-docs', swaggerUi.serve);


mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true
})
    .then(() => console.log("MongoDB is connected..."))
    .catch(err => console.log(err.message))

app.use("/", routes);

app.listen(PORT, function() {
    console.log("listening on port " + PORT);
})
