import { state } from '../store/store.js';

export function toggleTask(id) {
    state.tasks = state.tasks.map(t =>
        t.id === id ? {
            ...t,
            done: !t.done
        } : t
    )
}


export function deleteTask(id) {
    state.tasks = state.tasks.filter(t => t.id !== id);
}