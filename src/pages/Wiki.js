import classes from './Wiki.module.css';
import ObjectsMap from '../components/utils/ObjectsMap';

const Wiki = () => {
  return ( 
    <div>
      <div className={classes.title}>
        <h1>Click an Object to view its details</h1>
      </div>
      <ObjectsMap wiki='wiki' />
    </div> 
  );
}
 
export default Wiki;