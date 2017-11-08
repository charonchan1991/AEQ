
// constructor function for a Battle
function Battle(transformerA, transformerB) {
  
  if (!(this instanceof Battle))
    return new Battle(transformerA, transformerB);

  this.winner = null;
  this.loser = null;
  this.gameOver = false;
  this.loserRanAway = false;

  var _transformer = [transformerA, transformerB];
  this.fighters = _transformer;
  
  // check for special rules first
  for (var i = 0; i < 2; i++) {
    j = Math.abs(i-1);  // index for opponent
    switch (_transformer[i].name) {
    case 'Optimus Prime':
    case 'Predaking':
      switch (_transformer[j].name) {
      case 'Optimus Prime':
      case 'Predaking':
        // the game ends
        this.gameOver = true;
        break;
      default:
        // whoever has the name 'Optimus Prime' or 'Predaking' wins
        this.winner = _transformer[i];
        this.loser = _transformer[j];
        this.loser.destroyed = true;
      }
      break;
    }
  }
  
  if (!this.gameOver) {
    
    // If any fighter is down 4 or more points of courage and 3 or more points of strength
    // loser ran away and not been destroyed
    if (this.winner === null) {
      for (var i = 0; i < 2; i++) {
        j = Math.abs(i-1);  // index for opponent
        if (_transformer[i].attr.courage - _transformer[j].attr.courage > 3 && 
            _transformer[i].attr.strength - _transformer[j].attr.strength > 2) {
          this.winner = _transformer[i];
          this.loser = _transformer[Math.abs(i-1)];
          this.loserRanAway = true;
        }
      }
    }

    // if one of the fighters is 3 or more points of skill above their opponent, he wins
    if (this.winner === null) {
      for (var i = 0; i < 2; i++) {
        j = Math.abs(i-1);  // index for opponent
        if (_transformer[i].attr.skill - _transformer[j].attr.skill > 2) {
          this.winner = _transformer[i];
          this.loser = _transformer[j];
          this.loser.destroyed = true;
        }
      }
    }

    // Otherwise, winner is the transformer with the highest overall rating
    if (this.winner === null) {
      for (var i = 0; i < 2; i++) {
        j = Math.abs(i-1);  // index for opponent
        if (_transformer[i].rating > _transformer[j].rating) {
          this.winner = _transformer[i];
          this.loser = _transformer[j];
          this.loser.destroyed = true;
        }
      }
    }
  }

  // in the event of a tie, both transformers are considered destroyed
  if (this.winner === null) {
    _transformer[0].destroyed = true;
    _transformer[1].destroyed = true;
  }

}

module.exports = Battle;
