const httpMocks = require('node-mocks-http');
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
    const request = {
      body: {
        userId: 1,
        content: 'jest joke test',
      }
    };

    const result = jokeController.postJoke(request, '', () => {
      return 'successfully reached end of postJoke';
    });

    const useFunction = async () => {
      const jokeArrayResponse = await sql`SELECT jokes_posted FROM users WHERE id=${request.body.userId}`;
      const jokeArray = jokeArrayResponse[0].jokes_posted;
      // console.log(jokeArray)
      const jokeId = jokeArray[jokeArray.length - 1];
      const jokeResponse = await sql`SELECT content FROM jokes WHERE id=${jokeId}`;
      const joke = jokeResponse[0].content;
      return joke;
    };
    const finalResult = await useFunction();
    expect(finalResult).toEqual('jest joke test');
  });

  it('get a joke from the database', async () => {

    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
      })
    };

    const response = await fetch('http://localhost:3000/api/joke/retrieveJoke', request)
    const data = await response.json();

    expect(response.status === 200);
    // console.log(data);
    expect(typeof data).toEqual('object');
    expect(data.hasOwnProperty('id')).toEqual(true)
    expect(data.hasOwnProperty('content')).toEqual(true)
    expect(data.hasOwnProperty('creator_id')).toEqual(true)
    expect(data.hasOwnProperty('liked_by')).toEqual(true)
    expect(data.hasOwnProperty('created_at')).toEqual(true)
  });
  
  it('gotten joke should not be in jokes_viewed array', async () => {
    const request = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 1,
      })
    };
    
    const jokeViewedArrayResponse = await sql`SELECT jokes_viewed FROM users WHERE id=1`;

    const jokeViewed = jokeViewedArrayResponse[0].jokes_viewed;
    const response = await fetch('http://localhost:3000/api/joke/retrieveJoke', request)
    const data = await response.json();
    
    expect(response.status === 200);
    console.log('Stored data ===>', data)
    console.log('Jokes array ===>', jokeViewed);
    expect(typeof data).toEqual('object');
    expect(!jokeViewed.includes(data.id))
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