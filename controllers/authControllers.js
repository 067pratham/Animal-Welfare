const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
// const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const mysql = require('mysql');
const {
//   createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");

const con=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.password,
  database: "ngo"
})

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const register = async (req, res) => {
  const { username, password,NGO,Pincode,Location,Contact} = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ error: "Username or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    NGO,
    Pincode,
    Location,
    Contact,
    userId: uuidv4(),
    username,
    password: hashedPassword,
  };
  try {
    const userAlreadyExists = await checkRecordExists("user", "username", username);
    if (userAlreadyExists) {
      res.status(409).render("userexist.ejs");//json({ error: "Username already exists" });
    } else {
      await insertRecord("user", user);
      res.status(201).render("successuser.ejs");//({ message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res
      .status(400)
      .json({ error: "username or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("user", "username", username);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).render("invalid.ejs");
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        console.log(username);
        con.query("select * from request where user=?",[username],function(err,result){
          if(err) throw err;
          console.log(result);
          res.render("ngoprofile.ejs",{result});
        })
      } else {
        res.status(401).render("invalid.ejs");
      }
    } else {
      res.status(401).render("invalid.ejs");
    }
  } catch (error) {
    res.status(401).render("invalid.ejs");
  }
};

module.exports = {
  register,
  login,
};