const sql = require('../../db/db');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password, joke } = req.body;

    // check if username is already exists
    const userResponse = await sql`SELECT username FROM users WHERE username=${username}`;
    res.locals.userExists = false;
    if (userResponse.length !== 0) {
      res.locals.userExists = true;
      return next();
    }
    const createUserResponse = await sql`INSERT INTO users (username, password) VALUES (${username}, ${password}) RETURNING id, username`;
    const userInfo = createUserResponse[0];
    res.locals.userInfo = userInfo;
    const createFirstJokeResponse = await sql`INSERT INTO jokes (content, creator_id) VALUES (${joke}, ${res.locals.userInfo.id}) RETURNING id`;
    const firstJokeId = createFirstJokeResponse[0].id;
    await sql`UPDATE users SET jokes_posted=ARRAY_APPEND(jokes_posted, ${firstJokeId}) WHERE id=${res.locals.userInfo.id}`;
    return next();
  } catch (error) {console.log('error in userController create User', error)};
}

userController.verifyUser = async (req, res, next) => {
  try {
    // const ssid = req.cookies.ssid;
    // if (ssid) return next();
    
    const { username, password } = req.body;
    const passwordResponse = await sql`SELECT password FROM users WHERE username=${username}`;
    const truePassword = passwordResponse[0].password;
    res.locals.authenticated = false;  
    if (password === truePassword) {
      res.locals.authenticated = true;
      const userObjResponse = await sql`SELECT * FROM users WHERE username=${username}`;
      res.locals.userObj = userObjResponse[0];
    };
    return next();
  } catch (error) {console.log('error in userController verifyUser', error)}
}
module.exports = userController;
