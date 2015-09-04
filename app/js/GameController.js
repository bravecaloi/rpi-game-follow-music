(function() {
  'use strict'

  var app = angular.module('GameApp', ['slickCarousel']);

  var SONGS = [
    {
      'position': 0,
      'name': 'Feliz Cumpleaños',
      'notes': 'DO DO RE DO FA MI DO DO RE DO FA MI'
    },
    {
      'position': 1,
      'name': 'Himno de la Alegría',
      'notes': 'RE DO FA MI DO DO RE DO FA MI DO DO DO DO'
    },
    {
      'position': 2,
      'name': 'Enter Sandman',
      'notes': 'FA MI DO DO RE DO FA MI DO DO RE DO DO DO RE DO FA '
    },
    {
      'position': 3,
      'name': 'Spagheti del rock',
      'notes': 'MI DO DO RE DO FA MI DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA'
    },
    {
      'position': 4,
      'name': 'Chopin 1',
      'notes': 'DO DO RE DO FA MI DO DO RE'
    },
    {
      'position': 5,
      'name': 'Autoum Leaves',
      'notes': 'DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA MI DO DO RE DO FA MI'
    },
  ];

  var TONES = ['DO','RE','MI','FA','SOL','LA','SI'];

  var FRUITS = {
    'DO':   'fruit_apple',
    'RE':   'fruit_banana',
    'MI':   'fruit_cherry',
    'FA':   'fruit_kiwi',
    'SOL':  'fruit_lemon',
    'LA':   'fruit_orange',
    'SI':   'fruit_strawberry'
  };

  app.controller('GameDisplayController', function($scope, toastService) {

    $scope.selectedSong = {};
    $scope.currentNote  = 0;
    $scope.notes = [];

    $scope.slickConfig = {
        centerMode: true,
        slidesToShow: 3,
        // centerPadding: '60px',
        arrows: false,
        method: {},
        event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {
              $('#fruit'+currentSlide).removeClass('current-fruit');
              $('#fruit'+nextSlide).addClass('current-fruit');
            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
            }
        }
    };

    $scope.getFruit = function(note){
      return 'img/' + FRUITS[note] + '.png';
    }

    $scope.goNext = function(){
      $scope.slickConfig.method.slickNext();
    }

    global.goNextHack = $scope.goNext;

    var changeSong = function(position){
      $scope.selectedSong = SONGS[position];
      $scope.notes = $scope.selectedSong.notes.split(' ');
    }

    changeSong(0);

  });// end SearchBoxCtrl


  app.service('toastService', function() {

    var show = function(content) {
    };

    return {
      show: show
    };
  });// end toastService




})();
