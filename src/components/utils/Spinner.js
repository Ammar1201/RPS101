import classes from './Spinner.module.css';

const Spinner = () => {
  return ( 
    <div className={classes.loaderContainer}>
      <div className={classes.loader}></div> 
    </div>
  );
}
 
export default Spinner;