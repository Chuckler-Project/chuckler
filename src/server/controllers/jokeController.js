const sql = require('../../db/db');

const jokeController = {};

// get a joke from the database that the requesting user did not write
jokeController.getJoke = async (req, res, next) => {
  try {
    const {userId} = req.body;
    const lookForUnseenJoke = async () => {
      // get the jokes that the user has already seen
      const viewedJokesResponse = await sql`SELECT jokes_viewed FROM users WHERE id=${userId}`;
      let viewedJokesArray = viewedJokesResponse[0].jokes_viewed;
      // get all the jokes that the user didn't write
      const otherUsersJokesArrayOfIds = await sql`SELECT id FROM jokes WHERE creator_id != ${userId}`;
      // loop through the jokes that the user didn't write until reaching one the user hasn't seen
      let chosenJokeId;
      if (viewedJokesArray === null) chosenJokeId = otherUsersJokesArrayOfIds[0].id
      else {
        for (const joke of otherUsersJokesArrayOfIds) {
          if (!viewedJokesArray.includes(joke.id)) {
            chosenJokeId = joke.id;
            break;
          }
        };
      };
      return chosenJokeId;
    };
    let chosenJokeId = await lookForUnseenJoke();
    // if there is no chosen joke, reset the users jokes_viewed array and try again
    if (!chosenJokeId) {
      await sql`UPDATE users SET jokes_viewed=null WHERE id=${userId}`;
      chosenJokeId = await lookForUnseenJoke();
    }
    const jokeResponse = await sql`SELECT * FROM jokes WHERE id=${chosenJokeId}`;

    // working version wo seen jokes filetering
    // jokeResponse = await sql`SELECT * FROM jokes WHERE creator_id != ${userId} ORDER BY RANDOM() LIMIT 1`;
   
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
    // get stored ids from front end,
    const { userId, jokeId } = req.body;
    // check if joke is already in joke's liked_by array
    const likedByResponse = await sql`SELECT liked_by FROM jokes WHERE id=${jokeId}`;
    const likedByArray = likedByResponse[0].liked_by;
    if (likedByArray === null) {
      // add userId to joke's liked_by array
      await sql`UPDATE jokes SET liked_by=ARRAY_APPEND(liked_by, ${userId}) WHERE id=${jokeId}`;
    }
    else if (!(likedByArray.includes(userId))) {
      // add userId to joke's liked_by array
      await sql`UPDATE jokes SET liked_by=ARRAY_APPEND(liked_by, ${userId}) WHERE id=${jokeId}`;
    };
    // check to see if joke is already in user's jokes_liked array
    const jokesLikedResponse = await sql`SELECT jokes_liked FROM users WHERE id=${userId}`;
    const jokesLikedArray = jokesLikedResponse[0].jokes_liked;
    if (jokesLikedArray === null) {
      // add jokeId to users jokes_liked array
      await sql`UPDATE users SET jokes_liked=ARRAY_APPEND(jokes_liked, ${jokeId}) WHERE id=${userId}`;
      res.locals.likeMessage = `User ${userId} liked joke ${jokeId}`;
    }
    else if (!jokesLikedArray.includes(jokeId)) {
    // add jokeId to users jokes_liked array
      await sql`UPDATE users SET jokes_liked=ARRAY_APPEND(jokes_liked, ${jokeId}) WHERE id=${userId}`;
      res.locals.likeMessage = `User ${userId} liked joke ${jokeId}`;
    } else res.locals.likeMessage = `User ${userId} already liked joke ${jokeId}`
    return next();
  } catch (err) {
    next({
      log: `Error in likeJoke middleware: ${err}`,
      message: `Error liking joke: ${err}`
    });
  };  
};

module.exports = jokeController;
