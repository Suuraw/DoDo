import db from "../db/db.js";
import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";
env.config();

const secretKey = process.env.JWT_SECRET;
const salt=10;
export const registerUser = async (req, res) => {
  let { firstName, lastName, username, password } = req.body;
  console.log(firstName + " " + lastName);
  try {
    //look user in the database
    const duplicate = await db.query(
      "SELECT * FROM users WHERE username=($1)",
      [username]
    );
    // const duplicate = await User.find({username});
    if (duplicate.rows.length > 0) {
      return res
        .status(400)
        .send({ message: "User already registered with this username" });
    }
    // let user = new User({firstName,lastName,username,password});
    // const result = await user.save();
    const hashPassword=await bcrypt.hash(password,salt);
    const result = await db.query(
      "INSERT INTO users (username,password) VALUES($1,$2)",
      [username, hashPassword]
    );
 
    res.status(201).send({ message: "User registered successfullY!" });
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Step 1: Query the database for the user by username
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);

    // Step 2: Check if the user exists
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const storedPassword = user.password;

      // Step 3: Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, storedPassword);
      if (isPasswordValid) {
        // Step 4: Generate JWT token
        const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

        // Step 5: Prepare final data to send in response
        const finalData = {
          userId: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          token,
        };
        console.log(finalData);
        // Send response with user data and token
        return res.json(finalData);
      } else {
        return res.status(401).send({ message: "Entered password is wrong" });
      }
    } else {
      return res.status(401).send({ message: "Invalid username" });
    }
  } catch (err) {
    console.error(err);
    return res.status(400).send({ message: "Error during login.", error: err.message });
  }
};