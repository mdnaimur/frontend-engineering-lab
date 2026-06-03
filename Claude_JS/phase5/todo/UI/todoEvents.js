import { render } from '../render.js';
import { deleteTask, toggleTask } from '../services/todoService.js';

export function initTodoEvent() {
    const list = document.getElementById('todoList');

    list.addEventListener('click', (e) => {
        const item = e.target.closest('.todo-item');
        if (!item) return;
        const id = parseInt(item.dataset.id);
        const action = e.target.dataset.action

        if (action === 'toggle') {
            toggleTask(id);
            render();
        }

        if (action == 'delete') {
            deleteTask(id);
            render();
        }
    });
}