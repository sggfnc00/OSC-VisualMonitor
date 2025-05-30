function toggleMenu() {
  const panel = document.getElementById('menuPanel');
  panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
}

function toggleSection(sectionId) {
  const section = document.getElementById(`${sectionId}Section`);
  section.style.display = section.style.display === 'none' ? 'flex' : 'none';
}
