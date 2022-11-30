import { useState } from 'react';
import { Link } from 'react-router-dom';
import { objectsSrcName } from '../../data';
import Card from './Card';
import classes from './ObjectsMap.module.css';

const ObjectsMap = ({getObjectID, wiki}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [objects, setObjects] = useState(objectsSrcName);
  const [objectID, setObjectID] = useState(null);

  const sendID = ({target}) => {
    if (target.id === '') {
      return;
    }
    if(wiki !== 'wiki') {
      getObjectID(target.id);
    }
    if(wiki === 'wiki') {
      setObjectID(target.id);
    }
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
    <div className={classes.mobile}>
      <div className={classes.search}>
        <label>Search for Object:</label>
        <input type="text" value={searchQuery} placeholder='search...' onChange={searchObject} />
      </div>
      {wiki !== 'wiki' && <div className={classes.container}  onClickCapture={sendID}>
        {Object.values(objects).map(object => {
          return ( <Card object={object} key={object.name} /> );
        })}
      </div>}
      {wiki === 'wiki' && <Link to={`/wiki/${objectID}`}>
      <div className={classes.container}  onClickCapture={sendID}>
        {Object.values(objects).map(object => {
          return ( <Card object={object} key={object.name} /> );
        })}
      </div></Link>}
    </div> 
  );
}
 
export default ObjectsMap;