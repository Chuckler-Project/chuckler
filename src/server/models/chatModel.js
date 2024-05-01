const db = require("../../db/db");
const chatModel = {};

chatModel.getMessages = async (id) => {
  const getMessagesQuery = await db.query(
    `SELECT message_content,created_at from messages WHERE from_user_id=$1 LIMIT 10`,
    [id]
  );
  const messagesResult = getMessagesQuery.rows;
  console.log(messagesResult);
  return messagesResult;
};

chatModel.sendMessage = async (id, message) => {
  const getMatchQuery = await db.query(
    "SELECT match_id from matches WHERE user_id_1=$1",
    [id]
  ); //will be changed once matchModel.getMatchByUserIds is completed
  const matchId = getMatchQuery.rows[0]["match_id"];
  const sendMessageQuery = await db.query(
    "INSERT INTO MESSAGES (from_user_id,message_content,match_id) VALUES($1,$2,$3)",
    [id, message, matchId]
  );
};
module.exports = chatModel;
