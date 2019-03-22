var app = angular.module('myModal', ['onsen']);

// クイズトップページ用コントローラー
app.controller('topCtrl', function() {
  this.gameStart = function() {
    myNavigator.pushPage('questions.html');
  };
});

// クイズ出題ページ用コントローラー
app.controller('gameCtrl', function() {
  //
});