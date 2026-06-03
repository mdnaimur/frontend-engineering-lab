import { getFilterStudents } from '../utils/getFilterStudents.js';
import { getGrade } from '../utils/getGrade.js';

import { renderPagination } from '../features/renderPagination.js';
import { getCurrentPage, setCurrentPage } from '../state/state.js';
import { removeStudent } from '../utils/RemoveStudent.js';

const rowsPerPage = 5;


export function renderTable() {
    const tbody = document.getElementById("tableBody");

    // const filtered_data = students;
    const filtered_data = getFilterStudents();
    const totalPages = Math.ceil(filtered_data.length / rowsPerPage);

    const currentPage = getCurrentPage();

    if (currentPage > totalPages) {
        setCurrentPage(totalPages || 1);
    }

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const paginatedData = filtered_data.slice(start, end);

    tbody.innerHTML = paginatedData.map((s, index) => {
        const grade = getGrade(s.score);

        return `
          <tr>
            <td>${start + index + 1}</td>
            <td>${s.name}</td>
            <td>${s.subject}</td>
            <td>${s.score}</td>
            <td> <span class ="badge grade-${grade}" > ${grade}</span></td>
            <td> <button class="remove-btn" data-id="${s.id}" style="color:#dc2626; border:none; background:none; cursor:pointer; font-size:18px" title="Remove">x</button> </td>

        </tr>
        `

    }).join("");


    renderPagination(filtered_data.length);


    /// remove student 

    document.addEventListener("click", (e) => {

        if (e.target.classList.contains("remove-btn")) {
            const id = e.target.dataset.id;
            console.log(" I am reomve btn id", id);

            removeStudent(id);
        }
    })
}



