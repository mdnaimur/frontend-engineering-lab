import { state } from '../store/store.js';

// let tasks = [];
// let currentFilter = 'all';
// let nextId = 1;


function createTask(text, priority) {

    return {
        id: state.nextid++,
        text,
        priority,
        done: false,
        createdAt: new Date()
    };

}


export { createTask };

