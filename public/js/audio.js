let audioEnabled = false;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playClick(frequency) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = 'square';
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.1, audioContext.currentTime);

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.1);
}

function toggleAudio() {
  audioEnabled = document.getElementById('audioToggle').checked;
}
