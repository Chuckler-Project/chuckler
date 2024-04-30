const sql = require('../../db/db')
const bcrypt = require("bcrypt");
const saltRounds = 10;
const userController = {};
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

userController.createUser = async (req, res, next) => {
  try {
    const {email, password, joke, username } = req.body;

    // check if email already exists
    const userResponse = await sql`SELECT email FROM users WHERE email=${email}`;
    console.log(userResponse);
    res.locals.userExists = false;
    if (userResponse.length !== 0) {
      res.locals.userExists = true;
      return next();
    }

    // add user to db
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createUserResponse =
      await sql`INSERT INTO users (email, password,username) VALUES (${email}, ${hashedPassword},${username}) RETURNING id, username`;
    const userInfo = createUserResponse[0];
    res.locals.userInfo = userInfo;

    // add users first joke to db
    const createFirstJokeResponse =
      await sql`INSERT INTO jokes (content, creator_id) VALUES (${joke}, ${res.locals.userInfo.id}) RETURNING id`;
    const firstJokeId = createFirstJokeResponse[0].id;
    await sql`UPDATE users SET jokes_posted=ARRAY_APPEND(jokes_posted, ${firstJokeId}) WHERE id=${res.locals.userInfo.id}`;
    return next();
  } catch (error) {
    console.log("error in userController create User", error);
  }
};
//checks to see if user has a email/password saved in database
userController.verifyUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const passwordResponse =
      await sql`SELECT password FROM users WHERE email=${email}`;
    console.log("passwordResponse: ", passwordResponse);
    console.log("passwordResponse length: ", passwordResponse.length);

    if (passwordResponse.length < 1) {
      console.log("hit")
      return res.status(401).send("incorrect password or email");
    }

    const hashedPassword = passwordResponse[0].password;

    // if password matches set authenticated to true
    res.locals.authenticated = false;
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (isCorrectPassword) {
      res.locals.authenticated = true;
      const userObjResponse =
        await sql`SELECT * FROM users WHERE email=${email}`;
      res.locals.userObj = userObjResponse[0];
    }

    return next();
  } catch (error) {
    console.log("error in userController verifyUser", error);
  }
};
//set's user's online status to true
userController.setIsOnlineTrue = async (req, res, next) => {
  try {
    const { email } = req.body;
    await sql`UPDATE users SET is_online=true WHERE email=${email} `;
    return next();
  } catch (err) {
    next({
      log: `Error in userController.setIsOnlineTrue middleware: ${err}`,
      message: `Error setting user isOnline status: ${err}`,
    });
  }
};
//set's user's online status to false
userController.setIsOnlineFalse = async (req, res, next) => {
  try {
    const {id} = req.body;
    await sql`UPDATE users SET is_online=false WHERE id=${id} `;
    return res.send("updated and cleared");
  } catch (err) {
    next({
      log: `Error in userController.setIsOnlineTrue middleware: ${err}`,
      message: `Error setting user isOnline status: ${err}`,
    });
  }
};
userController.getUsername = async (req, res, next) => {
  try {
    const { id } = req.body;
    const response = await sql`SELECT username from users where id=${id}`;
    return res.send(response[0].username);
  } catch (err) {
    next({
      log: `Error in userController.getUsername middleware: ${err}`,
      message: `Error getting username : ${err}`,
    });
  }
};
userController.getProfileJokes = async(req,res,next) =>{
  const token = req.cookies.jwt;
  const userID = jwt.verify(token, secretKey);
  const jokesArr = [];
  const joinTable = await sql`
  SELECT username,bio,id,content 
  FROM users
  INNER JOIN jokes ON ${userID}=creator_id`
  for(const {id,content} of joinTable){
    if(id==userID) jokesArr.push(content);
  }
  res.send(jokesArr);
}
module.exports = userController;
