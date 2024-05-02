const sql = require('../../db/db');

const usernameController = {};

usernameController.getName = async (req, res, next) => {
  try {
    // const { to_user_id } = 7;
    const { to_user_id } = req.body;

    const usernameResponse =
    await sql`SELECT username FROM users WHERE id=${to_user_id}`;
    let username = usernameResponse[0].username;
    res.locals.receiverName = username;
    console.log('@@@@@@@@@@@@@@@@@@ res.locals.receiverName', res.locals.receiverName);
    console.log('@@@@@@@@@@@@@@@@@@ res.body', req.body);

    return next();
  } catch (err) {
    next({
      log: `Error in usernameController.getName ${err}`,
      message: 'An error occurred getting the receiver username',
    });
  }
};
//res.locals.receiverName

module.exports = usernameController;
