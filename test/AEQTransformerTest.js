var assert = require("chai").assert;

var startBattles = require('../assignment/AEQTransformer').startBattles;
var describeBattles = require('../assignment/AEQTransformer').describeBattles;

// feel free to add more wars & transformers
var wars = [
  // =================================================
  //                     WAR 1
  //    test case from the assignment 2 example
  // =================================================
  {
    // please fill out the expected results for auto-testing
    expect: {
      numOfBattles: 1,
      allDestroyed: false,
      winnerTeam: 'D',
      // Hubcap survived because he is skipped
      survivorsFromLosingTeam: ['Hubcap']
    },
    // the order for the criteria input is:
    //  [strength, intelligence, speed, endurance, rank, courage, firepower, skill]
    transformers: [
      {
        name: 'Soundwave',
        team: 'D',
        criteria: [8, 9, 2, 6, 7, 5, 6, 10]
      },
      {
        name: 'Bluestreak',
        team: 'A',
        criteria: [6, 6, 7, 9, 5, 2, 9, 7]
      },
      {
        name: 'Hubcap',
        team: 'A',
        criteria: [4, 4, 4, 4, 4, 4, 4, 4]
      }
    ]
  },
  // =================================================
  //                      WAR 2
  //                 custom test case
  // =================================================
  {
    // please fill out the expected results for auto-testing
    expect: {
      numOfBattles: 4,
      allDestroyed: false,
      winnerTeam: 'D',
      // Bluestreak survived because he won a battle, Jazz survived because he just ran away
      survivorsFromLosingTeam: ['Bluestreak', 'Jazz']
    },
    // the order for the criteria input is:
    //  [strength, intelligence, speed, endurance, rank, courage, firepower, skill]
    transformers: [
      {
        name: 'Soundwave',
        team: 'D',
        criteria: [8, 9, 2, 6, 8, 7, 6, 10]
      },
      {
        name: 'Optimus Prime',
        team: 'D',
        criteria: [9, 9, 6, 3, 2, 8, 6, 8]
      },
      {
        name: 'Predaking',
        team: 'D',
        criteria: [9, 8, 9, 8, 1, 8, 9, 8]
      },
      {
        name: 'Bumblebee',
        team: 'D',
        criteria: [2, 4, 5, 3, 3, 4, 5, 3]
      },
      {
        name: 'Jazz',
        team: 'A',
        criteria: [5, 5, 3, 5, 7, 2, 9, 9]
      },
      {
        name: 'Ironhide',
        team: 'A',
        criteria: [9, 9, 6, 3, 2, 8, 6, 8]
      },
      {
        name: 'Bluestreak',
        team: 'A',
        criteria: [6, 6, 7, 9, 5, 2, 9, 7]
      },
      {
        name: 'Hubcap',
        team: 'A',
        criteria: [4, 4, 4, 4, 4, 4, 4, 4]
      }
    ]
  },

  // =================================================
  //                      WAR 3
  //                 custom test case
  // =================================================
  {
    // please fill out the expected results for auto-testing
    expect: {
      numOfBattles: 3,
      allDestroyed: true,
      winnerTeam: 'A',
      // no one should survive because Optimus Prime[A] should meet Predaking[D] at ROUND 3 and destroy all
      survivorsFromLosingTeam: [] 
    },
    // the order for the criteria input is:
    //  [strength, intelligence, speed, endurance, rank, courage, firepower, skill]
    transformers: [
      {
        name: 'Mirage',
        team: 'D',
        criteria: [3, 4, 5, 2, 4, 2, 4, 5]
      },
      {
        name: 'Predaking',
        team: 'D',
        criteria: [9, 9, 6, 6, 3, 3, 2, 8]
      },
      {
        name: 'Barricade',
        team: 'D',
        criteria: [3, 4, 5, 2, 6, 2, 4, 5]
      },
      {
        name: 'Frenzy',
        team: 'A',
        criteria: [1, 3, 5, 6, 3, 4, 3, 5]
      },
      {
        name: 'Optimus Prime',
        team: 'A',
        criteria: [9, 9, 6, 3, 2, 8, 6, 8]
      },
      {
        name: 'Jolt',
        team: 'A',
        criteria: [8, 9, 2, 6, 8, 7, 6, 5]
      }
    ]
  }
];

describe('ASSIGNMENT 2: THE TRANSFORMATION COMPANY:', function () {

  wars.forEach(function(war, index) {
    
    var result = startBattles(war.transformers);
    var description = describeBattles(result);

    describe('WAR ' + (index + 1), function () {

      it('the number of battles should be ' + war.expect.numOfBattles, function () {
        assert.equal(
          description.numOfBattles,
          war.expect.numOfBattles,
          'the returned number of battle(s) is ' + JSON.stringify(description.numOfBattles)
        );
      });
      it('the winning team should be ' + war.expect.winnerTeam, function () {
        assert.equal(
          description.winnerTeam,
          war.expect.winnerTeam,
          'the returned winning team is ' + JSON.stringify(description.winnerTeam)
        );
      });
      if (war.expect.allDestroyed) {
        it('all competitors should be destroyed', function () {
          assert.equal(
            description.allDestroyed,
            war.expect.allDestroyed
          );
        });
      }
      it('the survivor(s) from the losing team should be ' + JSON.stringify(war.expect.survivorsFromLosingTeam), function () {
        assert.sameMembers(
          description.survivorsFromLosingTeam,
          war.expect.survivorsFromLosingTeam, 
          'the returned survivor(s) from the losing team is ' + JSON.stringify(description.survivorsFromLosingTeam)
        );
      });

      // this is fun: show how the war progresses
      var battleStrings = [];
      result.battles.forEach(function(battle, idx) {
        battleStrings.push(
          '\tROUND ' + (idx + 1) + ': ' +
          battle.fighters[0].name + '[' + battle.fighters[0].team + ']' +
          ' VS. ' + 
          battle.fighters[1].name + '[' + battle.fighters[1].team + ']' + 
          '\t-> ' + (battle.winner === null ? 
            (battle.gameOver ? 'GAME OVER, all competitors destroyed' : 'TIE, both are dead') : 
            battle.winner.name + '[' + battle.winner.team + '] won, ' + 
            battle.loser.name + '[' + battle.loser.team + ']' + (battle.loserRanAway ? ' ran away and survived' : ' is dead'))
        );
      });
      it('battle history: \n' + 
        battleStrings.join('\n') + 
        '\n\tFINAL RESULT: A:D=' + description.stats.A + ':' + description.stats.D);

    });

  });

});
