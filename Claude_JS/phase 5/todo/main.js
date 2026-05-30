import { render } from './render.js';
import { initTodoEvent } from './UI/todoEvents.js';

import { renderStats } from './services/getRenderStats.js';
import { initTaskEvents } from './UI/taskEvents.js';

document.addEventListener('DOMContentLoaded', () => {
    initTodoEvent();
    initTaskEvents()
    renderStats()
    render();
});

