function toggleMenu() {
  const panel = document.getElementById('menuPanel');
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
}

function toggleSection(sectionId) {
  const section = document.getElementById(`${sectionId}Section`);
  section.style.display = section.style.display === 'none' ? 'flex' : 'none';
}

let fontSize = 70; // vh per h1
let circleSize = 10; // vw per .circle

function changeSize(delta) {
  // Aggiorna font-size degli h1 (senza limite massimo)
  fontSize = Math.max(4, fontSize + delta);
  document.querySelectorAll('h1').forEach(h1 => {
    h1.style.fontSize = fontSize + 'vh';
  });

  // Aggiorna dimensione dei cerchi (senza limite massimo)
  circleSize = Math.max(4, circleSize + delta);
  document.querySelectorAll('.circle').forEach(c => {
    c.style.width = circleSize + 'vw';
    c.style.height = circleSize + 'vw';
  });
}