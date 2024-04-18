const sql = require('../../db/db');

const jokeController = {};

// get a joke from the database that the requesting user did not write
jokeController.getJoke = async (req, res, next) => {
  try {
    const {userId} = req.body;
    // get the jokes that the user has already seen to exclude from the sql query
    const viewedJokesResponse = await sql`SELECT jokes_viewed FROM users WHERE id=${userId}`;
    let viewedJokesArray = viewedJokesResponse[0].jokes_viewed;
    console.log('viewed jokes array', viewedJokesArray);
    const param = [...viewedJokesArray];
    let jokeResponse;
    // working version wo seen jokes filetering
    jokeResponse = await sql`SELECT * FROM jokes WHERE creator_id != ${userId} ORDER BY RANDOM() LIMIT 1`;


    // get all the jokes that the user didn't write
    const otherUsersJokesResponse = await sql`SELECT id FROM jokes WHERE creator_id != ${userId}`;
    const otherUsersJokes = otherUsersJokesResponse[0];
    console.log('other users jokes',otherUsersJokes);
    // get all the jokes that the viewer has seen
    // sort in js and give joke back that way

    // res.locals.joke = 'joke';
    if (jokeResponse.length === 0) return next({ log: `No joke found`, message: 'No more jokes in the database'});
    res.locals.joke = jokeResponse[0];
    return next();
  } catch (err) { 
    next({
      log: `Error in getJoke middleware: ${err}`,
      message: 'An error occurred getting the joke'
    }) 
  }
};

jokeController.addJokeToViewed = async (req, res, next) => {
  try {
    const {userId} = req.body;
    await sql`UPDATE users SET jokes_viewed=ARRAY_APPEND(jokes_viewed, ${res.locals.joke.id}) WHERE id=${userId}`;
    return next();
  } catch (err) {
    next({
      log: `Error in addJokeToViewed middleware: ${err}`,
      message: 'An error occurred adding the joke to the users jokes viewed list'
    }) 
  };
};

// post a joke to the database
jokeController.postJoke = async (req, res, next) => {
  try {
      const { userId, content } = req.body;
      // add joke to db and return the joke id
      const jokeIdResponse = await sql`INSERT INTO jokes (content, creator_id) VALUES (${content}, ${userId}) RETURNING id`;
      const jokeId = jokeIdResponse[0].id;
      // add joke to user jokes_posted array
      await sql`UPDATE users SET jokes_posted=ARRAY_APPEND(jokes_posted, ${jokeId}) WHERE id=${userId}`;
      return next();
    } catch (err) { 
      next({
        log: `Error in postJoke middleware: ${err}`,
        message: `Error posting joke: ${err}`
      }) 
    }
}

// like a joke in the database
jokeController.likeJoke = async (req, res, next) => {
  try {
    // get stored ids from front end, eliminate request for user id
    const { userId, jokeId } = req.body;;
    // add userId to joke's liked_by array
    await sql`UPDATE jokes SET liked_by=ARRAY_APPEND(liked_by, ${userId}) WHERE id=${jokeId}`;
    // add jokeId to users jokes_liked array
    await sql`UPDATE users SET jokes_liked=ARRAY_APPEND(jokes_liked, ${jokeId}) WHERE id=${userId}`;
    res.locals.likeMessage = `User ${userId} liked joke ${jokeId}`;
    return next();
  } catch (err) {
    next({
      log: `Error in likeJoke middleware: ${err}`,
      message: `Error liking joke: ${err}`
    });
  };  
};

module.exports = jokeController;
