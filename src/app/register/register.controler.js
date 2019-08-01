angular.module('app',[])
    .controller('indexController', indexController);

indexController.$inject = ['$rootScope','$scope'];
console.log();
function indexController($rootScope,$scope) {
    $scope.helloWorld = function() {
        console.log('hello');
    }

    $scope.message = 'From the controller!';
}
