(function () {
  var app = angular.module('ngMongo');

  var Mongo = function ($resource) {
    return {
      databases: $resource('/mongo-api/dbs')
    };
  };

  app.factory('Mongo', ['$resource', Mongo]);
})();