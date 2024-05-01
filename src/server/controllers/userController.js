const sql = require('../../db/db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password, joke } = req.body;

    // check if username already exists
    const userResponse = await sql`SELECT username FROM users WHERE username=${username}`;
    res.locals.userExists = false;
    if (userResponse.length !== 0) {
      res.locals.userExists = true;
      return next();
    }

    // add user to db
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const createUserResponse = await sql`INSERT INTO users (username, password) VALUES (${username}, ${hashedPassword}) RETURNING id, username`;
    const userInfo = createUserResponse[0];
    res.locals.userInfo = userInfo;

    // add users first joke to db
    const createFirstJokeResponse = await sql`INSERT INTO jokes (content, creator_id) VALUES (${joke}, ${res.locals.userInfo.id}) RETURNING id`;
    const firstJokeId = createFirstJokeResponse[0].id;
    await sql`UPDATE users SET jokes_posted=ARRAY_APPEND(jokes_posted, ${firstJokeId}) WHERE id=${res.locals.userInfo.id}`;
    return next();
  } catch (error) {console.log('error in userController create User', error)};
}

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const passwordResponse = await sql`SELECT password FROM users WHERE username=${username}`;
    const hashedPassword = passwordResponse[0].password;

    // if password matches set authenticated to true
    res.locals.authenticated = false;  
    const isCorrectPassword = await bcrypt.compare(password, hashedPassword);
    if (isCorrectPassword) {
      res.locals.authenticated = true;
      const userObjResponse = await sql`SELECT * FROM users WHERE username=${username}`;
      res.locals.userObj = userObjResponse[0];
    };

    return next();
  } catch (error) {console.log('error in userController verifyUser', error)}
}

userController.setIsOnlineTrue = async (req, res, next) => {
  try {
    const {username} = req.body;
    await sql`UPDATE users SET is_online=true WHERE username=${username} `;
    return next();
  } catch (err) {
    next({
      log: `Error in userController.setIsOnlineTrue middleware: ${err}`,
      message: `Error setting user isOnline status: ${err}`
    });
  };
};

userController.setIsOnlineFalse = async (req, res, next) => {
  try {
    const {username} = req.body;
    await sql`UPDATE users SET is_online=false WHERE username=${username} `;
    return next();
  } catch (err) {
    next({
      log: `Error in userController.setIsOnlineTrue middleware: ${err}`,
      message: `Error setting user isOnline status: ${err}`
    });
  };
}

userController.viewUser = (req, res, next) => {
  const userID = parseInt(req.params.userId)
  const user = users.find(user => user.id === userID)

  if (!user) {
    return res.status(404).json({error: 'User not found'})
  }

  res.json(user)
}

userController.updateUserBio = (req, res, next) => {

}

module.exports = userController;
