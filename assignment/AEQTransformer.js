
var Transformer = require('./obj/Transformer');
var Battle = require('./obj/Battle');

// start a war given any collection of transformers
// to interpret the result, please use describeBattles() function
function startBattles(transformers) {

  var result = {
    skipped: [],  // a collection of Transformer objects that are not involved in any battle
    battles: []   // a collection of Battle objects which reveals battle history
  };

  // let's first create the transformer instances and put them into their corresponding alliances
  var autobots = [];
  var decepticons = [];
  transformers.forEach(function(data, index) {
    var transformer = new Transformer(data.name, data.team, data.criteria);
    switch (transformer.team) {
      case 'A':
        autobots.push(transformer);
        break;
      case 'D':
        decepticons.push(transformer);
        break;
    }
  });

  // now that we have created all the transformer instances, sort them by rank
  var sortByRank = function(a, b) {
    return b.attr.rank - a.attr.rank; // change this to (a.attr.rank - b.attr.rank) for ascending
  };
  autobots.sort(sortByRank);
  decepticons.sort(sortByRank);

  // now battle up
  var numOfBattles = Math.min(autobots.length, decepticons.length);
  for (var i = 0; i < numOfBattles; i++) {
    var battle = new Battle(autobots[i], decepticons[i]);
    result.battles.push(battle);
    // all competitors destroyed
    if (battle.gameOver) {
      autobots.forEach(function(transformer) {
        transformer.destroyed = true;
      });
      decepticons.forEach(function(transformer) {
        transformer.destroyed = true;
      });
      break;
    };
  }

  // save transformers that are skipped
  if (autobots.length > numOfBattles) {
    for (var i = numOfBattles; i < autobots.length; i++) {
      result.skipped.push(autobots[i]);
    }
  } else if (decepticons.length > numOfBattles) {
    for (var i = numOfBattles; i < decepticons.length; i++) {
      result.skipped.push(decepticons[i]);
    }
  }

  // returns the battle history
  return result;
}

// generate details based on what startBattles() returns
function describeBattles(battleResult) {

  var description = {
    numOfBattles: 0,
    winnerTeam: '',
    survivorsFromLosingTeam: [],
    allDestroyed: false,
    stats: null
  };

  description.numOfBattles = battleResult.battles.length;

  if (description.numOfBattles > 0) {
    // look into the battle history and get the statistics
    var stats = {
      A: 0,
      D: 0,
      tie: 0
    }
    battleResult.battles.forEach(function(battle, i) {
      if (battle.winner !== null) {
        stats[battle.winner.team] += 1;
      } else {
        stats.tie += 1;
      }
    });
    if (stats.A !== stats.D) {
      description.winnerTeam = stats.A > stats.D ? 'A' : 'D';
    }
    description.stats = stats;
  }

  // check if everyone is dead
  var _allDestroyed = true;
  battleResult.battles.forEach(function(battle) {
    battle.fighters.forEach(function(transformer) {
      if (!transformer.destroyed) _allDestroyed = false;
    });
  });
  if (_allDestroyed && battleResult.skipped.length > 0) {
    battleResult.skipped.forEach(function(transformer) {
      if (!transformer.destroyed) _allDestroyed = false;
    });
  }
  description.allDestroyed = _allDestroyed;

  // if it's not a tie, get all the survivors from the losing team
  if (description.winnerTeam.length !== 0 && !_allDestroyed) {
    
    // get the losing team
    var _losingTeam = description.winnerTeam === 'A' ? 'D' : 'A';

    // transformers that are skipped or ran away are survivors
    // loop through all transformers to find survivors from the losing team
    battleResult.skipped.forEach(function(transformer, i) {
      if (transformer.team === _losingTeam && !transformer.destroyed) {
        description.survivorsFromLosingTeam.push(transformer.name);
      }
    });
    battleResult.battles.forEach(function(battle, i) {
      battle.fighters.forEach(function(transformer, i) {
        if (transformer.team === _losingTeam && !transformer.destroyed) {
          description.survivorsFromLosingTeam.push(transformer.name);
        }
      });
    });
  }

  return description;

}

module.exports.startBattles = startBattles;
module.exports.describeBattles = describeBattles;
