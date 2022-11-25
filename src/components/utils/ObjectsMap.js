import React from'react';
import { objectsSrcName } from '../../data';
import Card from './Card';
import classes from './ObjectsMap.module.css';

const ObjectsMap = ({getObjectID}) => {
  const sendID = ({target}) => {
    if (target.id === '') {
      return;
    }
    getObjectID(target.id);
  };

  return ( 
    <div>
      <div className={classes.container}  onClickCapture={sendID}>
        {Object.values(objectsSrcName).map(object => {
          return ( <Card object={object} /> );
        })}
      </div>
    </div> 
  );
}
 
export default ObjectsMap;