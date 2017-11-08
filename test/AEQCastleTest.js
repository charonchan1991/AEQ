var assert = require("chai").assert;

// returns an array of peak/valley values,
// length of the array would be the number of castles to be built
var getCastles = require('../assignment/AEQCastle');

// feel free to add more test cases to test the function
// please fill out the expected results for auto-testing
var stretchOfLands = [
  {
    data: [1, 1],
    expect: [1]
  },
  {
    data: [1, 2],
    expect: [1, 2]
  },
  {
    data: [1, 2, 3, 3, 4],
    expect: [1, 4]
  },
  {
    data: [2, 6, 6, 6, 3],
    expect: [2, 6, 3]
  },
  {
    data: [2, 6, 6, 6, 6, 3, 2],
    expect: [2, 6, 2]
  },
  {
    data: [2, 6, 6, 6, 6, 3, 3, 3, 4],
    expect: [2, 6, 3, 4]
  },
  {
    data: [2, 6, 9, 6, 3],
    expect: [2, 9, 3]
  },
  {
    data: [2, 2, 2, -4, 5, 8, -3, 0, 3, 3, 3, 4, 4, 5, 1, 8],
    expect: [2, -4, 8, -3, 5, 1, 8]
  },
  {
    data: [5, 2, 5, 7, 2, 2, 6, 6, 6, 1, 5, 8, 8, 9],
    expect: [5, 2, 7, 2, 6, 1, 9]
  }
];

// test the function with the above data
describe('ASSIGNMENT 1: THE CASTLE COMPANY:', function () {

  stretchOfLands.forEach(function(stretchOfLand, index) {

    describe('Castles for the land ' + JSON.stringify(stretchOfLand.data), function () {
      
      var result = getCastles(stretchOfLand.data);
      it('should return ' + JSON.stringify(stretchOfLand.expect), function () {
        assert.deepEqual(result, stretchOfLand.expect);
      });
      it('total number of castles to be built: ' + result.length);

    });

  });

});
