// create web audio api context
let audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playNote(frequency, duration, dateRow) {
  // create Oscillator node
  let oscillator = audioCtx.createOscillator();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency; // value in hertz
  oscillator.connect(audioCtx.destination);
  oscillator.start();

  let row = document.getElementById(dateRow)
  row.style.color = 'red';
  let currentDateBox = document.getElementById('current-date-box');
  let currentPriceBox = document.getElementById('current-price-box');
  currentDateBox.innerHTML = `${dateRow.split('T')[0]}`;
  currentPriceBox.innerHTML = `$${(frequency - 100).toFixed(2)}`;

  setTimeout(
    function() {
      oscillator.stop();
      row.style.color = '#212529';
      playMelody();
    }, duration);
}

function playMelody() {
  if (notes.length > 0) {
    let note = notes.pop();
    let dateRow = dates.pop();
    let duration = 1000 * 256 / (note[1] * tempo);
    playNote(note[0], 1000 * 256 / (note[1] * tempo), dateRow);
  }
}

let priceData = JSON.parse(
  document.getElementById('price_data').textContent
);

notes = priceData.map(function(el) {
  return [el['close']+100, 4]
});

dates = priceData.map(function(el) {
  return el['date']
});

notes.reverse();
dates.reverse();

tempo = 750;

$('#play').click(function() {
  return playMelody();
});