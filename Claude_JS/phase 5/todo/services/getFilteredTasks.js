import { state } from '../store/store.js';

function getFilteredTasks() {
    switch (state.currentFilter) {
        case 'active': return state.tasks.filter(t => !t.done);
        case 'done': return state.tasks.filter(t => t.done);
        case 'high': return state.tasks.filter(t => t.priority == 'high');
            defulat: return tasks;
    }
}



export { getFilteredTasks };

