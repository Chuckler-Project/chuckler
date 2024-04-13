const sql = require('../../db/db');

const jokeController = {};

jokeController.getJoke = async (req, res, next) => {
  try {
    const response = await sql`SELECT * FROM jokes`;
    console.log('joke', response[0].content);
    res.locals.joke = response[0].content;
    return next();
  } catch (err) { console.log('error in jokeController.getJoke', err) }
}

jokeController.postJoke = async (req, res, next) => {
    const { user, content } = req.body;
    console.log('user/content', user, content)

    try {
        const response = await sql`SELECT id FROM users WHERE username=${user}`;
    
        console.log('user id', response);

        const userId = response[0].id;

        const secondResponse = await sql`INSERT INTO jokes (content, creator_id) VALUES (${content}, ${userId})`

        console.log('second response', secondResponse);
    
        return next();
    
      } catch (error) {console.log('error in userController', error)};
}

module.exports = jokeController;
