/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, winningScore, input;

init();

var isPrevSix;

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // random number
    var dice0 = Math.floor(Math.random() * 6) + 1;
    var dice1 = Math.floor(Math.random() * 6) + 1;

    // display result
    document.querySelector('.dice-0').style.display = 'block';
    document.querySelector('.dice-0').src = 'dice-' + dice0 + '.png';
    document.querySelector('.dice-1').style.display = 'block';
    document.querySelector('.dice-1').src = 'dice-' + dice1 + '.png';

    // updates the round score IF the rolled number was NOT a 1
    if (dice0 !== 1 && dice1 !== 1) {
      //add score
      roundScore += dice0 + dice1;
      document.querySelector(
        '#current-' + activePlayer
      ).textContent = roundScore;

      if (dice0 == 6 || dice1 == 6) {
        isPrevSix++;
      } else {
        isPrevSix = 0;
      }
      if (isPrevSix == 2) {
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent =
          scores[activePlayer];
        nextPlayer();
        isPrevSix = 0;
      }
    } else {
      //next player
      nextPlayer();
      isPrevSix = 0;
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // add current score to global scores
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score-' + activePlayer).textContent =
      scores[activePlayer];

    var input = document.getElementById('input').value;
    if (input) {
      winningScore = input;
    } else {
      winningScore = 50;
    }

    // check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice-0').style.display = 'none';
      document.querySelector('.dice-1').style.display = 'none';
      document
        .querySelector('.player-' + activePlayer + '-panel')
        .classList.add('winner');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;

  document.querySelector('.dice-0').style.display = 'none';
  document.querySelector('.dice-1').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}
