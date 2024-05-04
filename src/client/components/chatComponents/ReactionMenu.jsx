import React, { useState } from "react";
import thumbsEmoji from '../../images/thumbsEmoji.png'
import heartEmoji from '../../images/heartEmoji.png'
import laughingEmoji from '../../images/laughingEmoji.png'

const ReactionMenu = (props) => {
  
  const updateReaction = async (newReaction) => {
    try {
        const reactionResponse = await fetch('/api/reaction/updatereaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId: props.messageId, reaction: newReaction }) 
        });
        let reaction = await reactionResponse.json();
        // props.socket.send(JSON.parse(reaction));
        props.socket.send(JSON.stringify({content: '', user: props.usersData.user, receiver: props.usersData.receiver}));
        props.setNewEmoji(reaction);
    } catch (error) {console.log('Error trying to fetch reaction', error)}
  };

  function handleThumbClick() {
    // console.log('Thumb Emoji Clicked!');
    updateReaction(`${props.messageId}/1`);
    // props.setNewEmoji(true);
    props.setShowReactionMenu(false);
  }
  
  function handleHeartClick() {
    // console.log('Heart Emoji Clicked!');
    updateReaction(`${props.messageId}/2`);
    // props.setNewEmoji(true);
    props.setShowReactionMenu(false);
  }
  
  function handleLaughClick() {
    // console.log('Laugh Emoji Clicked!');
    updateReaction(`${props.messageId}/3`);
    // props.setNewEmoji(true);
    props.setShowReactionMenu(false);
  }

  return (
    <div className='reaction-menu'>
      <img src={thumbsEmoji}    onClick={handleThumbClick} style={{height: '25px'}}/>
      <img src={heartEmoji}     onClick={handleHeartClick} style={{height: '25px'}}/>
      <img src={laughingEmoji}  onClick={handleLaughClick} style={{height: '25px'}}/>
    </div>
  );
};

export default ReactionMenu;
