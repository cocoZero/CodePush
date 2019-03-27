angular.module('starter.controllers', [])

.controller('DashCtrl', function($rootScope,$scope) {

  $scope.testData = "我是本地的值";
  var watchDate=$scope.$watch(function () {return $rootScope.parentData}, function (value) {
    $scope.testData = $rootScope.parentData;
    console.log("我接收到了改变");
  });
  $scope.$on('$destroy', function() {
    watchDate;
});

})

.controller('ChatsCtrl', function($rootScope,$scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  console.log("----123----");
$scope.changeRootScopeData = function(){

    $rootScope.parentData = "改变后的data"+Math.random();
    console.log("我改变了---");
}
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('MineCtrl', function($scope,$state,Storage) {
  $scope.data=['0','1','2'];
  
})
.controller('LoginCtrl', function($scope,$state,$ionicModal,Storage) {

  //用于显示欢迎页
  $ionicModal.fromTemplateUrl('templates/welcome.html', {
    scope: $scope,
    animation: 'slide-in-up'
}).then(function(modal) {
    $scope.modal = modal
});
//关闭欢迎页，跳转到首页
$scope.goIn = function() {
    $scope.modal.hide();
    $state.go('tab.home');
};
//作用域销毁时，将显示欢迎页的modal销毁
$scope.$on('$destroy', function() {
    $scope.modal.remove();
});

  $scope.login = function(){
    Storage.set('loginFlag','1');
    $scope.modal.show();
    console.log(123);
  };

})
.controller('WelcomeCtrl', function($scope,$ionicSlideBoxDelegate) {

  $scope.nextSlide = function() {             //右滑  下一页面
    $ionicSlideBoxDelegate.next();

  }
  $scope.previousSlide = function() {             //左滑  上一页面
    $ionicSlideBoxDelegate.previous();
  }
  
})
;
