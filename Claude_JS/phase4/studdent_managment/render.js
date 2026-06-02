import { renderStats } from './features/renderStats.js';
import { renderTable } from './features/renderTable.js';



window.render = render;
function render() {

    renderTable();
    renderStats();

}


export { render };

