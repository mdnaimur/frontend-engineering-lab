
import { render } from '../render.js';
import { currectPage, getCurrentPage, setCurrentPage } from '../state/state.js';
import { getFilterStudents } from '../utils/getFilterStudents.js';

const rowPerPage = 5;
const currenctPage = getCurrentPage();
function renderPagination(totalItems) {

    const totalPages = Math.ceil(totalItems / rowPerPage);
    const container = document.getElementById("pagination");
    if (!container) {
        console.error("pagination container not found");
        return;
    }


    let buttons = "";

    // Previous button


    buttons += `
    <button style ="color:#000;" onclick="changePage(${currectPage - 1})"
    ${currectPage === 1 ? 'disabled' : ''}>
    Prev </button>
    `

    //page number 
    for (let i = 1; i <= totalPages; i++) {
        buttons += `
        
        <button onclick = "changePage(${i})"
        style = "${i === currectPage ? 'font-weight:bold;' : ''}">
        ${i}
        </button>
        `
    }


    // Next button
    buttons += `
        <button onclick="changePage(${currectPage + 1})"
        ${currectPage === totalPages ? 'disabled' : ''}>
        Next
        </button>
    `;

    container.innerHTML = buttons;
}



function changePage(page) {

    const filtered_data = getFilterStudents();
    const totalPages = Math.ceil(filtered_data.length / rowPerPage);
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    console.log("Switched to page:", currectPage);

    // renderTable();

    render();

}


window.changePage = changePage;

export { renderPagination };

