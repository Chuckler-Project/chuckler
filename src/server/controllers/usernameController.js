const sql = require('../../db/db');

const usernameController = {};

//get the receiver username by querying the id from SentMessages fetch request
usernameController.getName = async (req, res, next) => {
  try {
    const { to_user_id } = req.body;
    const usernameResponse =
      await sql`SELECT username FROM users WHERE id=${to_user_id}`;
    let username = usernameResponse[0].username;
    res.locals.receiverName = username;
    return next();
  } catch (err) {
    next({
      log: `Error in usernameController.getName ${err}`,
      message: 'An error occurred getting the receiver username',
    });
  }
};

module.exports = usernameController;
