import { render } from '../render.js';
import { addTask, setFilter } from '../services/taskService.js';

export function initTaskEvents() {

    // filter button 

    document.querySelector('.filters').addEventListener('click', (e) => {
        if (!e.target.matches('.filter-btn')) return;

        setFilter(e.target.dataset.filter);
        document.querySelectorAll('.filter-btn')
            .forEach(btn => btn.classList.remove('active'));

        e.target.classList.add('active');
        render();
    });

    // add button getElementById
    document.getElementById('addBtn')
        .addEventListener('click', () => {
            addTaskFromInput();
        });

    /// Enter key

    document.getElementById('taskInput')
        .addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                addTaskFromInput();
            }
        });

    function addTaskFromInput() {
        const input = document.getElementById('taskInput');

        const text = input.value.trim();
        if (!text) return;

        addTask({
            id: Date.now(),
            text,
            done: false
        });

        input.value = '';
        render();
    }

}