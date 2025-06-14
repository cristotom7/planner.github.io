function addTask() {
  const input = document.getElementById('task-input');
  const taskText = input.value.trim();
  if (taskText === '') return;

  const li = document.createElement('li');

  const label = document.createElement('span');
  label.textContent = taskText;

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('checkbox');
  checkbox.onclick = () => {
    li.classList.toggle('completed');
  };

  const deleteBtn = document.createElement('span');
  deleteBtn.textContent = '✕';
  deleteBtn.classList.add('delete-btn');
  deleteBtn.onclick = () => li.remove();

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(deleteBtn);

  document.getElementById('task-list').appendChild(li);
  input.value = '';
}