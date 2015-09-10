(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.controller('GameMechanicsController', function($scope, $timeout, FruitService, NotificationsService) {
    var ctrl = this;

    ctrl.selectedSong = {};
    ctrl.fruits = [];

    ctrl.fruitsContainer = document.getElementById('song');
    ctrl.songName = document.getElementById('songName');
    ctrl.songAuthor = document.getElementById('songAuthor');

    var fruitAnimationEnds = function(fruit){
      fruit.elem.style.webkitAnimationName = '';
      fruit.elem.style['display'] = 'none';

      if(fruit.hit == false){
        NotificationsService.fruitMissed(fruit);
      }
    }

    var createAllFruits = function(){
      ctrl.fruitsContainer.innerHTML = '';
      ctrl.fruits = [];
      var notes = ctrl.selectedSong.notes.split(' ');
      for (var i = 0; i < notes.length; i++) {
        var fruit = FruitService.createFruit(i, notes[i]);
        ctrl.fruits.push(fruit);
      }
    }

    var animateAllFruits = function(){
      for (var i = 0; i < ctrl.fruits.length; i++) {
        var fruit = ctrl.fruits[i];
        $timeout(function(mFruit) {
          return function() {
            FruitService.animateFruit(mFruit, fruitAnimationEnds);
          };
        }(fruit), fruit.delay * i);
      }
    }

    var startSong = function(){
      createAllFruits();
      // TODO animation for countdown to start playing
      animateAllFruits();
    }

    $scope.startSongCtrl = startSong;

    var changeSong = function(position){
      ctrl.selectedSong = SONGS[position];
      ctrl.songName.innerHTML = ctrl.selectedSong.name;
    }

    var scrollUpSong = function(){
      var newSong = ctrl.selectedSong.position + 1;
      changeSong( (newSong == SONGS.length) ? 0 : newSong);
    }

    var checkFruitsPosition = function (input){
      for (var i = 0; i < ctrl.fruits.length; i++) {
        var fruit = ctrl.fruits[i];
        if(fruit.tone == TONES[input] && fruit.hit == false && FruitService.overlapsThreshold(fruit.elem)){
          NotificationsService.fruitHit(fruit);
          return;
        }
      }
      NotificationsService.toneFailed(TONES[input]);
    }


    /** Interface for the TouchController **/
    global.GameController = {
      checkFruitsPosition: checkFruitsPosition,
      startSong: startSong,
      scrollUpSong: scrollUpSong
    }


    // DEFAULT song selected
    changeSong(DEFAULT_SONG);
    NotificationsService.changeInstrument(DEFAULT_INSTRUMENT);
  });

})();
