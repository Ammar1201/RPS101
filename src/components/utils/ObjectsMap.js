import React from'react';
import { objectsSrcName } from '../../data';
import classes from './ObjectsMap.module.css';

const ObjectsMap = () => {
  return ( 
    <div>
      <div className={classes.container}>
        {Object.values(objectsSrcName).map(object => {
          return (
            <div key={object.name} className={classes.card}>
              <img src={object.src} alt={object.name} />
              <h4>{object.name}</h4>
            </div>
          );
        })}
      </div>
    </div> 
  );
}
 
export default ObjectsMap;