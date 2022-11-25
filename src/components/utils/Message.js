import classes from './Message.module.css';

const Message = ({messageContent, title, setMessage}) => {
  return <div>
  <div className={classes.backdrop}></div>
  <div className={`${classes.card} ${classes.modal}`}>
    <header className={classes.header}>
      <h2>{title}</h2>
    </header>
    <div className={classes.content}>
      <p>{messageContent}</p>
    </div>
    <footer className={classes.actions}>
      <button className={classes.button} onClick={() => {setMessage(null)}}>Okay</button>
    </footer>
  </div>;
</div>
}
 
export default Message;