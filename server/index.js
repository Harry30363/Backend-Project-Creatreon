const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const multer = require('multer');
const { ObjectId } = require('mongodb');
const UserModel = require('./models/User'); // User schema
const authRoutes = require('./routes/auth'); // Ensure auth routes exist
const uploadRoutes = require('./routes/uploads'); // Ensure upload routes exist
const connectDB = require('./config/db'); // MongoDB connection function

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// **Connect to MongoDB**
connectDB(); // Ensure `connectDB` connects mongoose to MongoDB

// **Session Management**
app.use(expressSession({
    secret: "node_mongo123!@#",
    resave: true,
    saveUninitialized: true
}));

// **Set EJS as View Engine**
app.set('view engine', 'ejs');

// **File Upload Setup**
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });
app.use('/uploads', express.static('uploads'));

// **Routes**
app.use('/api/auth', authRoutes);
app.use('/api', uploadRoutes);

// **Error Handling**
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ error: err.message });
});

// **Home Route**
app.get('/', (req, res) => {
    let msg = req.session.msg || "";
    req.session.msg = ""; // Clear the message after displaying it
    res.render("home", { msg });
});

// **User Management Routes**
app.get('/adduser', (req, res) => res.render("user_add"));
app.post("/adduserSubmit", async (req, res) => {
    try {
        const user = new UserModel(req.body);
        await user.save();
        req.session.msg = "User added successfully.";
    } catch (error) {
        req.session.msg = "Failed to add user.";
    }
    res.redirect("/");
});

app.get('/listuser', async (req, res) => {
    const users = await UserModel.find();
    res.render("user_list", { userData: users });
});

app.get("/deleteuser", async (req, res) => {
    try {
        const result = await UserModel.deleteOne({ _id: new ObjectId(req.query.userId) });
        req.session.msg = result.deletedCount === 1 ? "User deleted" : "Cannot delete user";
    } catch (error) {
        req.session.msg = "Error deleting user.";
    }
    res.redirect("/");
});

app.get("/edituser", async (req, res) => {
    const user = await UserModel.findById(req.query.userId);
    res.render("user_edit", { user });
});

app.post("/EdituserSubmit", async (req, res) => {
    try {
        const { userId, ...updatedData } = req.body;
        const result = await UserModel.updateOne(
            { _id: new ObjectId(userId) },
            { $set: updatedData }
        );
        req.session.msg = result.modifiedCount === 1 ? "User updated successfully" : "Update failed";
        res.redirect("/listuser");
    } catch (error) {
        req.session.msg = "Error updating user.";
        res.redirect("/edituser?userId=" + req.body.userId);
    }
});

// **Transaction Management**
app.get('/addtransaction', (req, res) => res.render("transaction_add", { msg: req.session.msg || '' }));
app.post("/addtransactionSubmit", async (req, res) => {
    try {
        const transaction = await TransactionModel.create(req.body);
        req.session.msg = "Transaction done successfully.";
    } catch (error) {
        req.session.msg = "Transaction failed.";
    }
    res.redirect("/");
});

app.get('/listtransaction', async (req, res) => {
    const transactions = await TransactionModel.find();
    res.render("transaction_list", { transactionData: transactions });
});

// **File Upload Routes**
app.post('/upload', upload.single('file'), (req, res) => {
    if (req.file) {
        const fileData = { name: req.file.filename, type: req.body.type };
        res.status(200).json(fileData);
    } else {
        res.status(400).send('No file uploaded.');
    }
});

app.get('/uploads', (req, res) => res.status(200).json({ uploads }));

// **Server**
app.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
