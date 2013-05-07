Clementine.add('usf.models', function(exports) {
  
  /**
   @class Movie
   @constructor
   */
  function Movie(data) {
    this.token = data.token;
    this.username = data.username;
    this.password = data.password;
    this.role = data.role;
    this.hasCustomers = data.hasCustomers;
    this.hasMultipleDepartments = data.hasMultipleDepartments;
    this.defaultCustomer = data.defaultCustomer;
    this.defaultDepartment = data.defaultDepartment;
    this.division = data.division;
  }
  
  
  
  /**
   @class Actor
   @constructor
   */
  function Actor(data) {
    this.id = data.customerNumber;
    this.customerName = ModelHelpers.cleanSpecialChars(data.customerName, true);
    this.customerNumber = data.customerNumber;
    this.deliveryStatus = data.hasDeliveries.toLowerCase() === 'y' ? 'delivery' : '';
  }
  
  
  
  
  // Exports
  
  exports.Movie = Movie;
  exports.Actor = Actor;

}, []);