function addSubject() {
  const subject = document.getElementById('subjectInput').value.trim();
  const grade = document.getElementById('gradeInput').value.trim();
  if (!subject || !grade) return;

  const card = document.createElement('div');
  card.className = 'subject-card';

  card.innerHTML = `
    <div class="subject">${subject}</div>
    <div class="grade">${grade}</div>
    <button class="remove-btn" onclick="this.parentElement.remove()">×</button>
  `;

  document.getElementById('subjectList').appendChild(card);
  document.getElementById('subjectInput').value = '';
  document.getElementById('gradeInput').value = '';
}