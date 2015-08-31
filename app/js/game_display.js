
/***************** SONGS ************************/


global.songs = {
  'feliz_cumple0': 'DO DO RE DO FA MI DO DO RE DO FA MI',
  'feliz_cumple1': 'RE DO FA MI DO DO RE DO FA MI',
  'feliz_cumple2': 'FA MI DO DO RE DO FA MI',
  'feliz_cumple3': 'MI DO DO RE DO FA MI'
};


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
  global.changeSong('feliz_cumple0');
});


global.changeSong = function(song){
  $('#fruits_container').html('');

  global.notes = global.songs[song].split(' ');
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
