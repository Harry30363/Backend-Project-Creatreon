var express = require('express');
const mongoose = require('mongoose')
const cors = require("cors")
const UserModel = require('./models/User')
const multer = require('multer');


const app = express();                              
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/User");

let bodyParser = require('body-parser');
let expressSession = require('express-session');

let db = require('./database.js');
let {ObjectId} = require('mongodb');
app.use(expressSession({secret: "node_mongo123!@#", resave:true, saveUninitialized: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/uploads', express.static('uploads'));


app.get('/', function(req,res){
	let msg = "";
	if(req.session.msg != undefined && req.session.msg != "")
		msg = req.session.msg;
	res.render("home",{msg:msg});
});


app.get('/adduser', function(req,res){
	res.render("user_add");
});
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

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body; // Extract username and password from request body

    try {
        // Find user in the database
        const user = await UserModel.findOne({ username, password });

        if (user) {
            // If user exists, send success response
            res.json({ success: true, message: 'Login successful' });
        } else {
            // If no user found, send error response
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      return res.json({ success: false, message: 'All fields are required.' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        return res.json({ success: false, message: 'Email is already registered.' });
      }
  
      // Create a new user
      const newUser = new UserModel({ username, email, password });
      await newUser.save();
  
      res.json({ success: true, message: 'Registration successful!' });
    } catch (error) {
      console.error('Error during registration:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage });
  
  const uploads = [];
  
  app.post('/upload', upload.single('file'), (req, res) => {
    const { type } = req.body;
    if (req.file) {
      const fileData = { name: req.file.filename, type };
      uploads.push(fileData);
      res.status(200).json(fileData);
    } else if (req.body.link) {
      const linkData = { link: req.body.link, type: 'Link' };
      uploads.push(linkData);
      res.status(200).json(linkData);
    } else {
      res.status(400).send('No file or link uploaded.');
    }
  });
  
  app.get('/uploads', (req, res) => {
    res.status(200).json(uploads);
  });
  
  app.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
  });

