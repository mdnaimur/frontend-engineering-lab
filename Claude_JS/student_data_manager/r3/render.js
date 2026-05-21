import { renderStats } from './features/renderStats.js';
import { renderTable } from './features/renderTable.js';

window.render = render;
function render() {
    renderStats();
    renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
    render()
});


export { render };

