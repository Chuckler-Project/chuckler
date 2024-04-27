// require controllers:
const jokeController = require('../src/server/controllers/jokeController');
const userController = require('../src/server/controllers/userController');
const matchController = require('../src/server/controllers/matchController');
const sql = require('../src/db/db');


// // const db = require('../src/db/db');

describe('db unit test', () => {
  it('dummy test', () => {
    const a = 'a';
    expect(a).toEqual('a');
  });

  it('add a joke to the database', async () => {
    const request = {body: {
      userId: 1,
      content: 'jest joke test',
    }};

    const result = jokeController.postJoke(request, '', () => {
      return 'successfully reached end of postJoke';
    });

    const useFunction = async () => {
      const jokeArrayResponse = await sql`SELECT jokes_posted FROM users WHERE id=1`;
      const jokeArray = jokeArrayResponse[0].jokes_posted;
      // console.log(jokeArray)
      const jokeId = jokeArray[jokeArray.length-1];
      const jokeResponse = await sql`SELECT content FROM jokes WHERE id=${jokeId}`;
      const joke = jokeResponse[0].content;
      return joke;
    };
    const finalResult = await useFunction();
    expect(finalResult).toEqual('jest joke test');
  });

  it('get a joke from the database', async () => {
    // middleware is get Joke
    // shuffles, takes a joke from database, returns it to screen
    // need to pass in user id

    const request = {body: {
      userId: 1,
    }};

    const useFunction = async () => {
    const result = await jokeController.getJoke(request, '', () => {
      return 'Success';
    })};

    console.log("getJoke result in test ===> ", result);

    // what do we expect?
    //receive obj with content & creater ID
    expect(result).toEqual('Success');
  });

  it('gotten joke should not be in jokes_viewed array', () => {
    
  });

  it('add a user to the database', () => {

  });

  it('test liking/disliking a joke', () => {

  });

  it('test getting a match', () => {
    
  });

  it('user allowed to log in with correct credentials', () => {

  });
});

// jokes => id, content, creator_id, liked_by, created_at
// users => id, username, pw, created_at, jokes_liked, jokes_posted,
//          jokes_viewed, matches, is_online
// messages => id, created_at, from_user, to_user, content
