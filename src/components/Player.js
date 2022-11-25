import React, { useState } from 'react'
import ObjectsMap from "./utils/ObjectsMap";
import { objectsSrcName } from '../data';

const Player = ({setIsLoading}) => {
  const [id, setId] = useState(null);
  const getObjectID = (id) => {
    setId(id);
  };

  return ( 
    <div>
      <ObjectsMap setIsLoading={setIsLoading} getObjectID={getObjectID} />
    </div> 
  );
}
 
export default Player;