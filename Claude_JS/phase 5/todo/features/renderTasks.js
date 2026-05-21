import { getFilteredTasks } from '../services/getFilteredTasks.js';

export function renderTasks() {
    const filterTasks = getFilteredTasks();
    const list = document.getElementById('todoList');

    if (filterTasks.length === 0) {
        list.innerHTML = `
            <li class = "empty"> No tasks here.   </li>
        `
    }

    list.innerHTML = filterTasks.map(task => `
        <li class="todo-item ${task.done ? 'done' : ''}" data-id="${task.id}">
        <input type="checkbox" class="todo-checkbox" ${task.done ? 'checked' : ''} data-action="toggle" />
        <span class="priority-dot priority-${task.priority}"></span>
        <span class="todo-text">${escapeHtml(task.text)}</span>
        <button class="todo-delete" data-action="delete" title="Delete">×</button>
      </li>
        `).join('');

}