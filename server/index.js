var express = require('express');

const app = express();


let bodyParser = require('body-parser');
let expressSession = require('express-session');

let db = require('./database.js');
let {ObjectId} = require('mongodb');
app.use(expressSession({secret: "node_mongo123!@#", resave:true, saveUninitialized: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


app.post("/adduserSubmit", async function(req, res) {
    const usersCollection = db.collection("user");

    const userObj = {
        name: req.body.name,     
        email: req.body.email,
        password: req.body.password, 
        gender: req.body.gender,
        birthdate: new Date(req.body.birthdate),
        phone: req.body.phone,
    };

        const result = await usersCollection.insertOne(userObj);

        if (result.acknowledged === true) {
            req.session.msg = "User added successfully.";
            res.redirect("/");
        } else {
            req.session.msg = "Failed to add user.";
            res.redirect("/");
        }
  
});

app.get('/listuser', async function(req,res){
	
	const usersCollection = db.collection("user");
	const result = await usersCollection.find().toArray();
	res.render("user_list", {userData: result});
});

app.get("/deleteuser",async function(req,res){
	let user_id =req.query ['userId'];
	const usersCollection = db.collection("user");

	const result = await usersCollection.deleteOne({_id:new ObjectId(user_id)});
	
	if(result.deletedCount === 1){
		req.session.msg = "user deleted";
		res.redirect("/");
	}
	else{
		req.session.msg = "can not delete user";
		res.redirect("/");
	}
	
});

app.get("/edituser",async function(req,res){
	const usersCollection = db.collection("user");
	const userId = req.query['userId'];
    const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
	
	res.render("user_edit", { user: user });
});
app.post("/EdituserSubmit", async function(req, res) {
    const usersCollection = db.collection("user");

  
    const userId = req.body.userId;
    const updatedUserData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password, 
        gender: req.body.gender,
        birthdate: new Date(req.body.birthdate),
        phone: req.body.phone
    };


        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) }, 
            { $set: updatedUserData }
        );

        if (result.modifiedCount === 1) {
            req.session.msg = "User updated successfully";
            res.redirect("/listUser"); 
        } else {
            req.session.msg = "User update failed or no changes made";
            res.redirect("/editUser?userId=" + userId); 
        }
    

});




app.get('/addtransaction', function(req, res) {
    res.render("transaction_add", { msg: req.session.msg || '' });
    req.session.msg = ''; // Clear the message after displaying it
});

app.post("/addtransactionSubmit", async function(req, res) {
    const transactionCollection = db.collection("transaction");

    const transactionObj = {
        carname: req.body.carname,     
        price: parseFloat(req.body.price), // Make sure to convert price to a number
        paymentmethod: req.body.paymentmethod, 
    };

    try {
        const result = await transactionCollection.insertOne(transactionObj);

        if (result.acknowledged === true) {
            req.session.msg = "Transaction done successfully.";
            res.redirect("/");
        } else {
            req.session.msg = "Transaction failed.";
            res.redirect("/addtransaction");
        }
    } catch (error) {
        req.session.msg = "Error: " + error.message;
        res.redirect("/addtransaction");
    }
});

app.get('/listtransaction', async function(req,res){
	
	const transactionCollection = db.collection("transaction");
	const result = await transactionCollection.find().toArray();
	res.render("transaction_list", {transactionData: result});
});

app.get("/deletetransaction",async function(req,res){
	let transaction_id =req.query ['transactionId'];
	const transactionCollection = db.collection("transaction");

	const result = await transactionCollection.deleteOne({_id:new ObjectId(transaction_id)});
	
	if(result.deletedCount === 1){
		req.session.msg = "transaction deleted";
		res.redirect("/");
	}
	else{
		req.session.msg = "can not delete transaction";
		res.redirect("/");
	}
	
});

app.get("/edittransaction",async function(req,res){
	const transactionCollection = db.collection("transaction");
	const transactionId = req.query['transactionId'];
    const transaction = await transactionCollection.findOne({ _id: new ObjectId(transactionId) });
	
	res.render("transaction_edit", { transaction: transaction });
});
app.post("/EdittransactionSubmit", async function(req, res) {
    const transactionCollection = db.collection("transaction");

  
    const transactionId = req.body.transactionId;
    const updatedtransactionData = {
        carname: req.body.carname,     
        price: req.body.price,
        paymentmethod: req.body.paymentmethod, 
    };


        const result = await transactionCollection.updateOne(
            { _id: new ObjectId(transactionId) }, 
            { $set: updatedtransactionData }
        );

        if (result.modifiedCount === 1) {
            req.session.msg = "transaction updated successfully";
            res.redirect("/listtransaction"); 
        } else {
            req.session.msg = "transaction update failed or no changes made";
            res.redirect("/edittransaction?transactionId=" + transactionId); 
        }
    
});





app.listen(8080, () => console.log("CRUD Server running at http://localhost:8080/"));
