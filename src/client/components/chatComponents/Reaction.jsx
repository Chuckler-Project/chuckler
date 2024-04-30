import React, { useEffect, useState } from "react";
import thumbsEmoji from '../../images/thumbsEmoji.png'
import heartEmoji from '../../images/heartEmoji.png'
import laughingEmoji from '../../images/laughingEmoji.png'

const Reaction = (props) => {

  const [currentEmoji, setCurrentEmoji] = useState();
  const [showEmoji, setShowEmoji] = useState(false);

  // useEffect(() => {
  //   if(props.reaction_emoji === '1') {
  //     setCurrentEmoji(thumbsEmoji);
  //   } else if(props.reaction_emoji === '2') {
  //     setCurrentEmoji(heartEmoji);
  //   } else if(props.reaction_emoji === '3') {
  //     setCurrentEmoji(laughingEmoji);
  //   } else {
  //     setCurrentEmoji('');
  //   }
  // }, [currentEmoji])

  // setCurrentEmoji(props.reaction_emoji);

  const getReaction = async () => {
    try {
        const reactionResponse = await fetch('/api/reaction/getreaction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messageId: props.messageId }) 
        });
        const reaction = await reactionResponse.json();
        console.log('reaction here ->', reaction);
        if(reaction === '1') {
          console.log('thumb');
          setCurrentEmoji(thumbsEmoji);
        } else if(reaction === '2') {
          console.log('heart');
          setCurrentEmoji(heartEmoji);
        } else if(reaction === '3') {
          console.log('laughing');
          setCurrentEmoji(laughingEmoji);
        } else {
          setCurrentEmoji('');
        }
    } catch (error) {console.log('Error trying to fetch reaction', error)}
  };

  useEffect(() => {
    getReaction();
    setShowEmoji(true);
  }, [props.newEmoji]);

  function removeClick() {
    const updateReaction = async () => {
      try {
          const reactionResponse = await fetch('/api/reaction/updatereaction', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messageId: props.messageId, reaction: '0'}) 
          });
          let reaction = await reactionResponse.json();
          setCurrentEmoji('');
      } catch (error) {console.log('Error trying to fetch reaction', error)}
    };
    updateReaction();
  }

  return (
    <div id='reaction'>
      {showEmoji ? <img src={currentEmoji} onClick={removeClick}/> : null}
    </div>
  );
};

export default Reaction;
