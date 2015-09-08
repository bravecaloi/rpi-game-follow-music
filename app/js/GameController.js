(function() {
  'use strict'

  var app = angular.module('GameApp', []);

  app.controller('GameDisplayController', function($scope, $timeout, toastService) {
    var ctrl = this;

    $scope.selectedSong = {};
    ctrl.fruits = [];

    $scope.startSong = function(){
      for (var i = 0; i < ctrl.fruits.length; i++) {
        var fruit = ctrl.fruits[i];

        $timeout(function(mFruit) {
          return function() { animateFruit(mFruit); };
        }(fruit), fruit.delay * i);
      }
    }

    ctrl.feedbackText = document.getElementById('feedbackText');
    function setFeedback(str){
      ctrl.feedbackText.classList.add('bounceIn');
      ctrl.feedbackText.innerHTML = str;
      setTimeout(function(){
        ctrl.feedbackText.classList.remove('bounceIn');
      }, 500);
    }

    var changeSong = function(position){
      document.getElementById('song').innerHTML = '';

      $scope.selectedSong = SONGS[position];

      var notes = $scope.selectedSong.notes.split(' ');
      $scope.total = notes.length;

      for (var i = 0; i < notes.length; i++) {
        var fruit = createFruit(notes[i], i);
        ctrl.fruits.push(fruit);
      }
    }

    $scope.checkPositions = function(input){
      for (var i = 0; i < ctrl.fruits.length; i++) {
        var fruit = ctrl.fruits[i];
        var rect = fruit.elem.getBoundingClientRect();
        var left = Math.round(rect.left);
        var right = Math.round(rect.right);

        if( fruit.tone == TONES[input] &&
            fruit.hit == false &&
            collide(fruit)
          ){
          setFeedback('Hit: ' + TONES[input] + ' -> ' + fruit.tone);
          fruit.hit = true;
          fruit.elem.style['opacity'] = 0.5;
          return;
        }
      }
      setFeedback('Failed: ' + TONES[input]);
    }

    var thres = document.getElementById('threashold').getBoundingClientRect();
    function collide(fruit) {
      var fruitPos = fruit.elem.getBoundingClientRect();

      // If some is false, then there is no overlapping
      return !(
        thres.top > fruitPos.bottom ||
        thres.right < fruitPos.left ||
        thres.bottom < fruitPos.top ||
        thres.left > fruitPos.right
      );
    }

    global.checkPositionsCtrl = $scope.checkPositions;

    function animateFruit(fruit){
      fruit.elem.style['-webkit-animation-name'] = 'moveit';
      fruit.elem.style['display'] = 'block';

      fruit.elem.addEventListener('webkitAnimationEnd', function(){
        this.style.webkitAnimationName = '';
        this.style['display'] = 'none';
        if(fruit.hit == false) setFeedback('Missed ' + fruit.tone);
      }, false);
    }

    changeSong(0);
  });



  function createFruit(tone, index){
    // note pos01 apple
    var span = document.createElement('span');
    var p = document.createElement('p');
    var elem = document.createElement('div');

    p.innerHTML = tone;
    elem.id = 'fruit' + index;
    elem.className = 'note ' + (index % 2 ? 'pos01 ' : 'pos02 ') + FRUITS[tone];

    elem.appendChild(span);
    elem.appendChild(p);
    document.getElementById('song').appendChild(elem);

    return {
      'tone': tone,
      'elem': elem,
      'hit': false,
      'delay': ((Math.random() * 2.8) + 0.8) * 1000
    }
  }



  app.service('toastService', function() {

    var show = function(content) {
    };

    return {
      show: show
    };
  });// end toastService




})();
