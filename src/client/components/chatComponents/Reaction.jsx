import React, { useEffect, useState } from "react";
import thumbsEmoji from '../../images/thumbsEmoji.png'
import heartEmoji from '../../images/heartEmoji.png'
import laughingEmoji from '../../images/laughingEmoji.png'

const Reaction = (props) => {

  const [currentEmoji, setCurrentEmoji] = useState();
  const [showEmoji, setShowEmoji] = useState(false);

  const getReaction = async () => {
    try {
        const reactionResponse = await fetch('/api/reaction/getreaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId: props.messageId }) 
        });
        const reaction = await reactionResponse.json();
        // console.log('line 19 reaction:', reaction);
        const reactionNumber = reaction.split('/')[1];
        // console.log('reactionNumber here ->', reactionNumber);
        if(reactionNumber === '1') {
          // console.log('thumb');
          setCurrentEmoji(thumbsEmoji);
          setShowEmoji(true);
        } else if(reactionNumber === '2') {
          // console.log('heart');
          setCurrentEmoji(heartEmoji);
          setShowEmoji(true);
        } else if(reactionNumber === '3') {
          // console.log('laughing');
          setCurrentEmoji(laughingEmoji);
          setShowEmoji(true);
        } else {
          setCurrentEmoji('');
          setShowEmoji(false);
        }
    } catch (error) {console.log('Error trying to fetch reaction', error)}
  };

  useEffect(() => {
    getReaction();
  }, [props.newEmoji, props.messages]);

  function removeClick() {
    const updateReaction = async () => {
      try {
          const reactionResponse = await fetch('/api/reaction/updatereaction', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messageId: props.messageId, reaction: `${props.messageId}/0`}) 
          });
          let reaction = await reactionResponse.json();
          // console.log(reaction);
          setCurrentEmoji('');
          props.setNewEmoji(`${props.messageId}/0`);
          setShowEmoji(false);
          props.socket.send(JSON.stringify({content: '', user: props.usersData.user, receiver: props.usersData.receiver}));
        } catch (error) {console.log('Error trying to fetch reaction', error)}
      };
      // console.log(props.className);
      if(props.className === 'senderReaction') {
        updateReaction();
    }
  }

  return (
    <div>
      {showEmoji ? 
        <div id='reaction' className={props.className}>
          <img src={currentEmoji} onClick={removeClick} style={{width: '20px', height: '20px'}}/>
        </div> 
      : null }
    </div>
  );
};

export default Reaction;
