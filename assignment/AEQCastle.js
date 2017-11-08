
// returns a collection of peak/valley values
module.exports = function (seq) {

  // if nothing in the array
  if (seq.length === 0) return [];

  var diff = 0;
  var castles = [];

  // always build a castle at the start
  castles.push(seq[0])

  // loop through each integer in the array
  for (var i = 0; i < seq.length; i++) {
    
    // if not the last integer
    if (i < seq.length - 1) {
      // test the monotonicity at this point:
      // if diffs on left and right have different signs, then it's a peak/valley
      if ((seq[i+1] - seq[i]) * diff < 0) {
        castles.push(seq[i]);
      }
      // if the next integer has the same value, continue search until find a different one or reach end of array
      else if (seq[i+1] === seq[i] && diff !== 0) {
        for (var j = i + 1; j < seq.length; j++) {
          // test the monotonicity again to determine if it's a peak/valley
          if (seq[i] !== seq[j]) {
            if ((seq[j] - seq[i]) * diff < 0) {
              castles.push(seq[i]);
            }
            break;
          } else if (j === seq.length - 1) {
            // end of array, no more different values, just return the final result
            castles.push(seq[i]);
            return castles;
          }
        }
      }
      // save the diff for next loop
      diff = seq[i+1] - seq[i];
    } else {
      // end of array, always a peak/valley unless equals to the preceding number
      if (diff !== 0) {
        castles.push(seq[i]);
      }
    }

  }
  // return the total num of castles to be built
  return castles;
}
