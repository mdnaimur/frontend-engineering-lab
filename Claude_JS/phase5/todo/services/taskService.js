import { state } from '../store/store.js';

export function setFilter(filter) {
    state.currentFilter = filter;
}

export function addTask(task) {
    state.tasks.push(task);
}