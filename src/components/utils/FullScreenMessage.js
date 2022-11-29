import React, { useEffect } from 'react';
import classes from './FullScreenMessage.module.css';

const FullScreenMessage = ({messageContent, setFullScreenMessage}) => {

  useEffect(() => {
    setFullScreenMessage(messageContent);
    setTimeout(() => {
      setFullScreenMessage('');
    }, 2000);
  }, [messageContent, setFullScreenMessage]);

  return (
    <div>
      <div className={classes.backdrop}></div>
        <div className={classes.content}>
          <h1>{messageContent}</h1>
        </div>
    </div>
  )
}

export default FullScreenMessage