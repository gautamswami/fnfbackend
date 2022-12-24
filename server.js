const express = require('express')
const bodyParser = require('body-parser')
const user = require('./app/model/user')
const UserRoute = require('./app/routes/user')
const app = express();
var cors = require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())  
const dbConfig = require('./config/database.config')
const mongoose = require('mongoose')
mongoose.connect(dbConfig.url).then(() => {
    console.log("Databse Connected Successfully!!");    
}).catch(err => {       
    console.log('Could not connect to the database', err);
    process.exit();
});
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});
app.get('/cors', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
    })
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is listening on port 3000");
});
app.use('/user',UserRoute)
