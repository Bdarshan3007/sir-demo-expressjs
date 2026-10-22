const Author = require('../models/authormodel');
const Post = require('../models/postmodel');

const createAuthor = async (req, res) => {
  // console.log("Create Todo function called");

  try {
    const { name, email } = req.body; //es6 

    const author = await Author.create({
      name,
      email,
    });

    res.status(201).json({
      success: true,
      message: "Author created successfully",
      data: author,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const createPost = async (req, res) => {
  // console.log("Create Todo function called");

  try {
    const { title, content, author } = req.body; //es6 

    const post = await Post.create({
      title,
      content,
      author
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};




const getAuthor = async (req, res) => {
  // console.log("Create Todo function called");

  try {
    // console.log("Get Author function called");

    let data = await Author.find(); // populate the author field with the author document

    res.status(200).json({
      success: true,
      message: "Authors fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPost = async (req, res) => {
  // console.log("Create Todo function called");

  try {

    let data = await Post.find().populate('author'); // populate the author field with the author document

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
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
  createAuthor,
  createPost,
  getAuthor,
  getPost
};
