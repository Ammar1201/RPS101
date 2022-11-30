import classes from './About.module.css';

const About = () => {
  return (
    <div className={classes.about}>
        <div className={classes.title}>
          <h1>RPS 101</h1>
          <p>Is a rock, paper, scissors game but with more objects 101 to be exact.</p>
        </div>
        <div className={classes.instructions}>
          <h2>How To Play:</h2>
          <p>The game played in rounds every round each player get to choose once.</p>
          <p>Every turn each player get to choose one object.</p>
          <p>You can change your mind until you press 'confirm choice' button.</p>
          <p>There is two ways to choose an object:</p>
          <p>1. You can choose one from the list of objects shown on the game screen.</p>
          <p>2. You can search for a specific object using the search bar shown on the game screen.</p>
          <p>Points and Rank will be calculated automatically.</p>
        </div>
        <div className={classes.mobile}>
          <div className={classes.card + ' ' + classes.twoPlayersMode}>
              <h3>Player Vs Player Mode</h3>
              <h4>Two players playing against each other</h4>
              <p>Player1 need to choose an object by clicking on it or you can search for a specific object.</p>
              <p>After he is done choosing you have to click 'confirm choice' button so the turn will move to the next player</p>
              <p>Player2 need to choose an object by clicking on it or you can search for a specific object.</p>
              <p>After he is done choosing you have to click 'confirm choice' button a 'Check' button will appear and a 'Cancel' button</p>
              <p>Click the 'Cancel' to reset the round and all players choose again</p>
              <p>Click the 'Check' to check who is the winner</p>
              <p>After click the 'check' button a 'Play Again' button appears click it to play another round</p>
            </div>
        </div>
        <div className={classes.cards}>
            <div className={classes.card}>
              <h3>Player Vs AI Mode</h3>
              <h4>One player playing against The AI with ranking and points</h4>
              <p>player1 need to choose an object by clicking on it or you can search for a specific object.</p>
              <p>After you is done choosing you have to click 'confirm choice' button so the turn will move to AI.</p>
              <p>The AI will choose an object and show the result afterwards.</p>
            </div>
            <div className={classes.card}>
              <h3>Free Mode</h3>
              <h4>Free mode where yo can play against the AI but without points or ranks</h4>
              <p>player1 need to choose an object by clicking on it or you can search for a specific object.</p>
              <p>After you is done choosing you have to click 'confirm choice' button so the turn will move to AI.</p>
              <p>The AI will choose an object and show the result afterwards.</p>
            </div>
        </div>
    </div> 
  );
}
 
export default About;