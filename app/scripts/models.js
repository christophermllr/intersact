Clementine.add('klm.models', function(exports) {
  
  /**
   @class Movie
   @constructor
   */
  function Movie(data) {
    this.id = data.year;
    this.name = data.name;
    this.year = data.year;
  }
  
  
  
  /**
   @class Actor
   @constructor
   */
  function Actor(data) {
    this.id = data.actorId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.gender = data.gender;
  }
  
  // Exports
  
  exports.Movie = Movie;
  exports.Actor = Actor;

}, []);