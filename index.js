require("dotenv").config({path:"./config.env"});
var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');
const e = require('express');
const path =require('path');
const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUI=require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition:{
        info:{
            title: 'Bank API',
            version: '1.0.0'
        }
    },
    apis:['index.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/apiDocs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));


// used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());


// create user account
app.get('/account/create/:name/:email/:password', function (req, res) {

    // check if account exists
    dal.find(req.params.email).
        then((users) => {

            // if user exists, return error message
            if(users.length > 0){
                console.log('User already in exists');
                res.send('User already in exists');    
            }
            else{
                // else create user
                dal.create(req.params.name,req.params.email,req.params.password).
                    then((user) => {
                        console.log(user);
                        res.send(user);            
                    });            
            }

        });
});


// login user 
app.get('/account/login/:email/:password', function (req, res) {

    dal.find(req.params.email).
        then((user) => {

            // if user exists, check password
            if(user.length > 0){
                if (user[0].password === req.params.password){
                    res.send(user[0]);
                }
                else{
                    res.send('Login failed: wrong password');
                }
            }
            else{
                res.send('Login failed: user not found');
            }
    });
    
});

// find user account
app.get('/account/find/:email', function (req, res) {

    dal.find(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});
/**
 * @swagger
 * /account/findOne/martha@email.com:
 *  get:
 *      description: Retrieves account from entered email
 *      responses:  
 *              200:
 *                  description:Success
 * 
 */
// find one user by email - alternative to find
app.get('/account/findOne/:email', function (req, res) {

    dal.findOne(req.params.email).
        then((user) => {
            console.log(user);
            res.send(user);
    });
});


// update - deposit/withdraw amount
app.get('/account/update/:email/:amount', function (req, res) {

    var amount = Number(req.params.amount);

    dal.update(req.params.email, amount).
        then((response) => {
            console.log(response);
            res.send(response);
    });    
});

/**
 * @swagger
 * /all:
 *  get:
 *      description: Display all user accounts
 *      responses:  
 *              200:
 *                  description:Success
 * 
 */
// all accounts
app.get('/account/all', function (req, res) {

    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
    });
});
//Serve static assets if in production
if(process.env.NODE_ENV ==='production'){
//set a static folder
app.use(express.static('public/build'));

app.get('*', (req, resp)=>{
    res.sendFile(path.resolve(__dirname, 'public', 'build', 'index.html'));

})
}

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Running on port: ' + port);