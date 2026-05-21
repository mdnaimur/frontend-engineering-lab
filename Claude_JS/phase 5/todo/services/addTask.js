import { state } from '../store/store.js';
import { createTask } from './createTask.js';

export function addTask() {
    const input = document.getElementById('taskInput');
    const priority = document.getElementById('prioritySelect').value;
    const text = input.value.trim();

    if (!text) {
        input.focus();
        return;
    }

    state.task.push(createTask(text, priority));
    input.value = '';
    input.focus();
    // render();

}