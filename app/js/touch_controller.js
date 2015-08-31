
var songsSelector = {
  08: 'feliz_cumple0',
  09: 'feliz_cumple1',
  10: 'feliz_cumple2',
  11: 'feliz_cumple3'
}

exports.touched = function(req, res) {
  res.send('OK');

  var key = req.params.number;

  if(key < 8){
    musicNotePressed(key);
  }else{
    global.changeSong(songsSelector[key]);
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
