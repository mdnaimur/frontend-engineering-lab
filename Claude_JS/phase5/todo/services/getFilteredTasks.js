import { state } from '../store/store.js';

function getFilteredTasks() {
    console.log(state);
    console.log(state.currentFilter);

    switch (state.currentFilter) {

        case 'active':
            return state.tasks.filter(t => !t.done);
        case 'done':
            return state.tasks.filter(t => t.done);
        case 'high':
            return state.tasks.filter(t => t.priority == 'high');

        case 'all':

            defualt: return state.tasks;
    }
}



export { getFilteredTasks };

