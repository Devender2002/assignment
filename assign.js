const items = document.querySelectorAll('.item');
const container1 = document.getElementById('container1');
const container2 = document.getElementById('container2');
const resetButton = document.getElementById('resetButton');
const successMessage = document.createElement('p');
successMessage.className = 'success-message';

items.forEach(item => {
  item.addEventListener('dragstart', dragStart);
});

container2.addEventListener('dragover', dragOver);
container2.addEventListener('dragenter', dragEnter);
container2.addEventListener('dragleave', dragLeave);
container2.addEventListener('drop', drop);

resetButton.addEventListener('click', resetContainers);

let draggedItem = null;

function dragStart(e) {
  draggedItem = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', this.innerHTML);
  this.classList.add('dragging');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
}

function dragEnter() {
  container2.classList.add('dragover');
}

function dragLeave() {
  container2.classList.remove('dragover');
}

function drop(e) {
  e.preventDefault();
  container2.classList.remove('dragover');
  const droppedItemText = e.dataTransfer.getData('text/plain');
  const newItem = document.createElement('li');
  newItem.innerText = droppedItemText;
  container2.appendChild(newItem);
  container2.appendChild(successMessage);
  draggedItem.classList.remove('dragging');
  container1.removeChild(draggedItem);
}

function resetContainers() {
  container2.innerHTML = '';
  successMessage.innerText = '';
  items.forEach(item => {
    container1.appendChild(item);
  });
}
