import classes from './Spinner.module.css';

const Spinner = () => {
  return ( 
    // <div className={classes.loaderContainer}>
    //   <div className={classes.loader}></div> 
    // </div>
    <div id={'loader'} className={classes.loading}>
      <span className={classes.loader}></span> 
    </div>
  );
}
 
export default Spinner;