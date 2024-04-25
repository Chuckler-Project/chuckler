// require controllers:



const db = require('../src/db/db');

describe('db unit test', () => {
  it('dummy test', () => {
    const a = 'a';
    expect(a).toEqual('a');
  });

  it('add a joke to the database', () => {

  });

  it('get a joke from the database', () => {

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
