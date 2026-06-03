import { state } from '../store/store.js';



export function getStats() {
    const total = state.tasks.length;
    const done = state.tasks.filter(t => t.done).length;
    const remaining = total - done;
    return { total, done, remaining }

}
