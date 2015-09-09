(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('NotificationsService', function() {

    // The feedback text is a fixed div
    var feedbackText = document.getElementById('feedbackText');

    /**
     * [Private]

     * Sets the content of feedbackText
     * and animates the text once
     */
    function setFeedback(str){
      feedbackText.classList.add('bounceIn');
      feedbackText.innerHTML = str;
      setTimeout(function(){
        feedbackText.classList.remove('bounceIn');
      }, 500);
    }

    /**
     * Activated when a Fruit is correctly hit
     */
    var fruitHit = function(fruit){
      setFeedback('Hit: ' + TONES[input] + ' -> ' + fruit.tone);
      fruit.hit = true;
      fruit.elem.style['opacity'] = 0.5;
    }

    /**
     * Activated when a fruit was missed
     */
    var fruitMissed = function(fruit){
      setFeedback('Missed: ' + fruit.tone);
    }


    /**
     * Activated when a note is played but no fruit is hit
     */
    var toneFailed = function(note){
      setFeedback('Failed: ' + note);
    }

    /**
     * Available Methods
     */
    return {
      fruitHit: fruitHit,
      fruitMissed: fruitMissed,
      toneFailed: toneFailed
    };

  });

})();
