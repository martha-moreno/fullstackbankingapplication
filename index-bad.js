const express = require('express');
const app = express();
const cors=require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

//mongoose.set("useNewUrlParser", true);
//mongoose.set("useFindAndModify", false);
//mongoose.set("useCreateIndex", true);

const port = process.env.PORT || 3000;
const config = require('./config');
const routes = require('./routes');

app.use(logger("dev"));

const dbUrl = config.dbUrl;

var options ={
    keepAlive: 1,
    connectTimeoutMS: 30000,
    //useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err)=>{
    if(err){
        console.log('Error connecting to MongoDB');
    }
    else{
        console.log('Connected to MongoDB');
    }   
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/users", routes);

app.listen(port, function(){
    console.log('Server running on port ' + port);
});

module.exports =app;