import { useState } from 'react';
import { objectsSrcName } from '../../data';
import Card from './Card';
import classes from './ObjectsMap.module.css';

const ObjectsMap = ({getObjectID}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [objects, setObjects] = useState(objectsSrcName);

  const sendID = ({target}) => {
    if (target.id === '') {
      return;
    }
    getObjectID(target.id);
    setSearchQuery('');
    setObjects(objectsSrcName);
  };

  const searchObject = ({target}) => {
    if(target.value === '') {
      setObjects(objectsSrcName);
      setSearchQuery('');
      return;
    }

    setSearchQuery(target.value);
    const tmp = Object.values(objects).filter(object => object.name.toLowerCase().includes(target.value.toLowerCase()));
    setObjects(tmp);
  };

  return ( 
    <div>
      <div className={classes.search}>
        <label>Search for Objects:</label>
        <input type="text" value={searchQuery} placeholder='search...' onChange={searchObject} />
      </div>
      <div className={classes.container}  onClickCapture={sendID}>
        {Object.values(objects).map(object => {
          return ( <Card object={object} key={object.name} /> );
        })}
      </div>
    </div> 
  );
}
 
export default ObjectsMap;