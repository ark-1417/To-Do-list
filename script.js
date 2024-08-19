document.getElementById('todoForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const taskText = document.getElementById('todoInput').value;
  const dateTime = document.getElementById('datetimeInput').value;

  if (taskText && dateTime) {
    addTask(taskText, dateTime);
    showNotification('Task added successfully!');
    document.getElementById('todoInput').value = '';
    document.getElementById('datetimeInput').value = '';
  }
});

function addTask(task, dateTime) {
  const li = document.createElement('li');
  li.innerHTML = `${task} <span>(${new Date(dateTime).toLocaleString()})</span>`;

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', function() {
    li.remove();
  });

  li.appendChild(deleteButton);
  document.getElementById('todoList').appendChild(li);

  scheduleReminder(task, dateTime);
}

function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');

  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}

function scheduleReminder(task, dateTime) {
  const reminderTime = new Date(dateTime).getTime();
  const currentTime = new Date().getTime();
  const timeDifference = reminderTime - currentTime;

  if (timeDifference > 0) {
    setTimeout(() => {
      showNotification(`Reminder: ${task}`);
      alert(`Reminder: ${task}`);
    }, timeDifference);
  }
}
