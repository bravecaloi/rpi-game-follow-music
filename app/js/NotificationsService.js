(function() {
  'use strict'

  var app = angular.module(GAME_APP_NAME);

  app.service('NotificationsService', function() {

    var userPoints = 0;

    var feedbackText = document.getElementById('feedbackText');
    var userPointsText = document.getElementById('userPoints');

    // Instruments
    var keyInstrument = {
      7: 'instrumentIcon1',
      8: 'instrumentIcon2',
      9: 'instrumentIcon3',
      10:'instrumentIcon4'
    };
    var selectedInstrument;

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

    var changeInstrument = function(key){
      if(selectedInstrument != undefined){
         selectedInstrument.classList.remove('active');
         selectedInstrument.classList.remove('animated');
         selectedInstrument.classList.remove('wobble');
      }
      selectedInstrument = document.getElementById(keyInstrument[key]);
      selectedInstrument.classList.add('active');
      selectedInstrument.classList.add('animated');
      selectedInstrument.classList.add('wobble');
    }


    /**
     * Activated when a Fruit is correctly hit
     */
    var fruitHit = function(fruit){
      setFeedback('Hit ' + fruit.tone + " !");
      fruit.hit = true;
      fruit.elem.style['opacity'] = 0.5;
      userPointsText.innerHTML = ++userPoints;
    }

    /**
     * Activated when a fruit was missed
     */
    var fruitMissed = function(fruit){
      setFeedback('Missed: ' + fruit.tone);
      userPointsText.innerHTML = --userPoints;
    }


    /**
     * Activated when a note is played but no fruit is hit
     */
    var toneFailed = function(note){
      setFeedback('Failed: ' + note);
      // userPointsText.innerHTML = --userPoints;
    }


    /** Interface for the TouchController **/
    global.NotificationsService = {
      changeInstrument: changeInstrument
    }


    /**
     * Available Methods
     */
    return {
      fruitHit: fruitHit,
      fruitMissed: fruitMissed,
      toneFailed: toneFailed,
      changeInstrument: changeInstrument
    };

  });

})();
