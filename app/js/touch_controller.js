
KEY_NOTES_PLAY      = [00, 01, 02, 03, 04, 05, 06, 07];
KEY_AUDIO_LIBRARY   = [08, 09, 10];
KEY_MUSIC_SELECTOR  = [11];


exports.touched = function(req, res) {
  res.send('OK');

  var key = req.params.number;

  if(key < 8){
    musicNotePressed(key);

  }else if(key == 11){
    $('#song_' + global.selectedSong).removeClass('selected');
    global.selectedSong = (++global.selectedSong == global.songs.length) ? 0 : global.selectedSong;
    global.changeSong(global.selectedSong);
  }
};


function musicNotePressed(key){
  var tonePressed = global.tones[key];
  var correctTone = global.notes[global.currentNote];

  // TODO animations on pass and fail
  if(tonePressed == correctTone){
    global.currentNote++;
  }else{
    global.currentNote = 0;
  }

  global.selectFruitNote(global.currentNote);
}
