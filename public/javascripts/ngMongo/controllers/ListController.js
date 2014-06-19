(function(){
  var app = angular.module('ngMongo');

  var ListController = function($scope, Mongo){
    $scope.databases = Mongo.databases.query();

    $scope.addDatabase = function(){
      var databaseName = $scope.newDatabaseName;

      if(!databaseName) return;

      var newDatabase = new Mongo.databases({name: databaseName});
      newDatabase.$save(function(u, resp) {
        //Success
        $scope.databases.push(newDatabase);
      }, function(u) {
        //Error
        alert("Error: could not connect to the database");
      });

      
      $scope.newDatabaseName = '';
    };

    $scope.removeDatabase = function(database){
      if(!database) return;

      if(confirm(String.format("Are you sure you want to delete the database '{0}'?", database.name))) {
        database.$delete({name: database.name});
        $scope.databases = _.without($scope.databases, database);
      }
    };
  };

  app.controller('ListController', ['$scope', 'Mongo', ListController]);
})();
