function toggleMenu() {
  const panel = document.getElementById('menuPanel');
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
}

function toggleSection(sectionId) {
  const section = document.getElementById(`${sectionId}Section`);
  section.style.display = section.style.display === 'none' ? 'flex' : 'none';
}

let fontSize = parseFloat(getComputedStyle(document.querySelector('h1')).fontSize) / window.innerHeight * 100; // vh
let circleSize = parseFloat(getComputedStyle(document.querySelector('.circle')).width) / window.innerWidth * 100; // vw

function changeSize(delta) {
  fontSize = Math.max(4, fontSize + delta);
  document.querySelectorAll('h1').forEach(h1 => {
    h1.style.fontSize = fontSize + 'vh';
  });

  circleSize = Math.max(4, circleSize + delta);
  document.querySelectorAll('.circle').forEach(c => {
    c.style.width = circleSize + 'vw';
    c.style.height = circleSize + 'vw';
  });
}