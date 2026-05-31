import { render } from '../render.js';
import { getFilteredStudents } from '../utils/getFilteredStudents.js';

import { getCurrentPage, setCurrentPage } from '../state/satate.js';

const rowsPerPage = 5;
const currentPage = getCurrentPage();
function renderPagination(totalItems) {

    const totalPages = Math.ceil(totalItems / rowsPerPage);
    const container = document.getElementById("pagination");
    if (!container) {
        console.error("Pagination container not found");
        return;
    }
    let buttons = "";

    // Previous button
    buttons += `
        <button onclick="changePage(${currentPage - 1})"
        ${currentPage === 1 ? 'disabled' : ''}>
        Prev
        </button>
    `;

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        buttons += `
            <button onclick="changePage(${i})"
            style="${i === currentPage ? 'font-weight:bold;' : ''}">
            ${i}
            </button>
        `;
    }

    // Next button
    buttons += `
        <button onclick="changePage(${currentPage + 1})"
        ${currentPage === totalPages ? 'disabled' : ''}>
        Next
        </button>
    `;

    container.innerHTML = buttons;
}


function changePage(page) {

    const filtered_data = getFilteredStudents();
    const totalPages = Math.ceil(filtered_data.length / rowsPerPage);
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    console.log("Switched to page:", currentPage);

    // renderTable();

    render();

}

// 🔥 ADD THIS LINE
window.changePage = changePage;

export { renderPagination };

