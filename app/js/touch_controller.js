
KEY_NOTES_PLAY      = [00, 01, 02, 03, 04, 05, 06, 07];
KEY_AUDIO_LIBRARY   = [08, 09, 10];
KEY_MUSIC_SELECTOR  = [11];


exports.touched = function(req, res) {
  res.send('OK');

  var key = req.params.number;

  if(key < 8){
    fruitNotePressed(key);

  }else if(key == 11){

    // scroll song
    console.log('scroll song');
  }
};


function fruitNotePressed(key){
  console.log('fruit pressed: ' + key);
}
