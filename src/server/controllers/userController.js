const sql = require('../../db/db');

const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    const { username, password, joke } = req.body;
    const createUserResponse = await sql`INSERT INTO users (username, password) VALUES (${username}, ${password}) RETURNING id, username`;
    console.log('createUserResponse', createUserResponse);
    // const userInfo = createUserResponse[0];
    // console.log(userInfo);
    // res.locals.userInfo = userInfo;

    return next();

  } catch (error) {console.log('error in userController', error)};
}

module.exports = userController;
