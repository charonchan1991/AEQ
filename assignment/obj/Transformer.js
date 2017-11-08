
// constructor function for a Transformer 
//    I would generally prefer ES6 to do this,
//    it's just setting things up would be a waste of time for a small project like this one

function Transformer(name, team, criteria) {
  
  if (!(this instanceof Transformer))
    return new Transformer(name, team, criteria);
  
  // if a specific criterion is not set, use these default values
  var _attr = {
    strength: 5,
    intelligence: 5,
    speed: 5,
    endurance: 5,
    rank: 5,
    courage: 5,
    firepower: 5,
    skill: 5
  };

  // criteria can be an array or an object
  if (Array.isArray(criteria)) {
    // if it's an array, populate _attr with the array data
    var i = 0;
    for (var prop in _attr){
      _attr[prop] = parseInt(criteria[i]);
      i += 1;
    }
  } else {
    // otherwise, try to read properties from the object
    for (var prop in _attr){
      if (criteria[prop]) _attr[prop] = parseInt(criteria[prop]);
    }
  }
  // loop through the loaded criteria to make sure they are within [1, 10]
  for (var prop in _attr){
    if (_attr[prop] < 1) _attr[prop] = 1;
    if (_attr[prop] > 10) _attr[prop] = 10;
  }

  var _team = team.trim().charAt(0).toUpperCase();
  
  this.name = name;
  this.team = _team;
  this.attr = _attr;
  this.dead = false;

  // computed property for overall rating
  Object.defineProperty(this, 'rating', {
    get: function() {
      var _attr = this.attr;
      return _attr.strength + _attr.intelligence + _attr.speed + _attr.endurance + _attr.firepower;
    }
  });

  Object.defineProperty(this, 'destroyed', {
    get: function() {
      return this.dead;
    },
    set: function(val) {
      this.dead = val;
    }
  });

}

module.exports = Transformer;
