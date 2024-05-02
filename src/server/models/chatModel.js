const db = require("../../db/db");
const chatModel = {};

chatModel.getMessages = async (match_id) => {
  const getMessagesQuery = `
  SELECT *
  FROM messages
  WHERE match_id = $1`;

  const result = await db.query(getMessagesQuery, [match_id]);
  const messagesResult = result.rows;
  console.log(messagesResult);
  return messagesResult;
};

chatModel.sendMessage = async (match_id, message, from_user_id) => {
  const sendMessageQuery = `
  INSERT INTO messages(match_id, message_content, from_user_id) 
  VALUES($1,$2,$3)`;

  const result = await db.query(sendMessageQuery, [
    match_id,
    message,
    from_user_id,
  ]);
  return result.rows[0];
};
module.exports = chatModel;
