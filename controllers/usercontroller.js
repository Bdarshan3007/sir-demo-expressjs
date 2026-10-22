const Todo = require('../models/usermodel');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 10;

const createTodo = async (req, res) => {
  // console.log("Create Todo function called");

  try {
    const { title, description, username, password } = req.body; //es6 

    haspass = await bcrypt.hash(password, saltRounds);
    // console.log("haspass", haspass);
    // return false;


    const todo = await Todo.create({
      title,
      description,
      username,
      password: haspass
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginTodo = async (req, res) => {
  try {
    const { username, password } = req.body;


    const user = await Todo.findOne({ username });

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {

      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    var token = jwt.sign({ username: username }, 'cdmin', { expiresIn: '30s' });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getTodo = async (req, res) => {
  // console.log("Create Todo function called");

  try {


    // let data = await Todo.find();
    // let data = await Todo.find({title:"tank"});
    // let data = await Todo.findById("6ac4bcddfd59ebab36a220e2");
    // let data = await Todo.findOne()
    // let data = await Todo.find().sort({ createdAt: 1 }); // sort by createdAt in descending order
    // let data = await Todo.find().limit(2).skip(1); // pagination, skip first 1 and limit to 2
    // let data = await Todo.find().select({ title: 1, description: 1 }); // select only title and description fields
    // let data = await Todo.find().countDocuments(); // count the number of documents in the collection
    // let data = await Todo.find().countDocuments(); // count the number of documents in the collection


    page = req.query.page;
    page = page ? page : 1;
    limit = 3;
    skip = (page - 1) * limit;
    let data = await Todo.find().limit(3).skip(skip); // count the number of documents in the collection



    res.status(200).json({
      success: true,
      message: "Todos fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  createTodo,
  getTodo,
  loginTodo
};
