import { useState } from 'react';
import { Link } from 'react-router-dom';
import { objectsSrcName } from '../../data';
import Card from './Card';
import classes from './ObjectsMap.module.css';

const ObjectsMap = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [objects, setObjects] = useState(objectsSrcName);
  const [objectID, setObjectID] = useState(null);

  const setID = ({target}) => {
    if (target.id === '') {
      return;
    }
    setObjectID(target.id);
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
      <div className={classes.title}>
        <h1>Click an Object to view its details</h1>
      </div>
      <div className={classes.search}>
        <label>Search for Object:</label>
        <input type="text" value={searchQuery} placeholder='search...' onChange={searchObject} />
      </div>
      <Link to={`/wiki/${objectID}`}>
        <div className={classes.container}  onClickCapture={setID}>
          {Object.values(objects).map(object => {
            return ( <Card object={object} key={object.name} /> );
          })}
        </div>
      </Link>
    </div> 
  );
}
 
export default ObjectsMap;