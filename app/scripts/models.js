Clementine.add('klm.models', function(exports) {
  
  /**
   @class Movie
   @constructor
   */
  function Movie(data) {
    this.id = data.id;
    this.name = data.name;
    this.year = data.year;
    this.imageLink = data.imageLink || 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/217490_1397241168487_6340158_n.jpg';
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
    this.imageLink = data.imageLink || 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/217490_1397241168487_6340158_n.jpg';
    this.actorUrl = data.actorUrl || 'https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-ash4/217490_1397241168487_6340158_n.jpg';
  }
  
  // Exports
  
  exports.Movie = Movie;
  exports.Actor = Actor;

}, []);