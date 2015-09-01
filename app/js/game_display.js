
/***************** SONGS ************************/


global.songs = [
  {
    'name': 'Feliz Cumpleaños',
    'notes': 'DO DO RE DO FA MI DO DO RE DO FA MI'
  },
  {
    'name': 'Himno de la Alegría',
    'notes': 'RE DO FA MI DO DO RE DO FA MI DO DO DO DO'
  },
  {
    'name': 'Enter Sandman',
    'notes': 'FA MI DO DO RE DO FA MI DO DO RE DO DO DO RE DO FA '
  },
  {
    'name': 'Spagheti del rock',
    'notes': 'MI DO DO RE DO FA MI DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA'
  },
  {
    'name': 'Chopin 1',
    'notes': 'DO DO RE DO FA MI DO DO RE'
  },
  {
    'name': 'Autoum Leaves',
    'notes': 'DO DO RE DO FA DO DO RE DO FA DO DO RE DO FA MI DO DO RE DO FA MI'
  },
]


/************************************************/


global.selectedSong = 0;
global.currentNote  = 0;

global.notes = []; //holder for the current song notes
global.tones = ['DO','RE','MI','FA','SOL','LA','SI'];

global.fruits = {
  'DO':   'fruit_apple',
  'RE':   'fruit_banana',
  'MI':   'fruit_cherry',
  'FA':   'fruit_kiwi',
  'SOL':  'fruit_lemon',
  'LA':   'fruit_orange',
  'SI':   'fruit_strawberry'
};

$(document).ready(function(){
  global.changeSong(0);
});


global.changeSong = function(index){
  $('#fruits_container').html('');

  var song = global.songs[index];
  global.selectedSong = index;
  $('#song_' + global.selectedSong).addClass('selected');

  global.notes = song.notes.split(' ');
  for (var i = 0; i < global.notes.length; i++) {
    var note = global.notes[i];
    global.addFruit(global.fruits[note], i);
  }

  global.currentNote = 0;
  global.selectFruitNote(0);
}

global.selectFruitNote = function(index){
  $('.music-fruit').each(function(i, elem){
    elem.className = 'music-fruit';
    if(i == index) elem.className = 'music-fruit current-music-fruit';
  });
}

global.addFruit = function(fruit, id){
  var img = document.createElement('img');
  img.id = 'fruit_' + id;
  img.className = 'music-fruit';
  img.src = 'img/' + fruit + '.png';

  $('#fruits_container').append(img);
}









angular.module('GameApp', [])
  .controller('GameDisplayController', function() {
    var gameApp = this;
    gameApp.songs = global.songs;
  });
