// console.log("Student Data Manager - R3");

import { students } from './data/students_data.js';
import { renderTable } from './features/renderTable.js';
import { computeStats } from './utils/computeStats.js';
// let students = [...students];
// console.log(students)



let currentPage = 1;
const rowsPerPage = 5;


/* IMPORTANT FIX */
window.render = render;
function render() {
    renderStats();
    renderTable();
}

document.addEventListener("DOMContentLoaded", () => {
    render()
});



function renderStats() {
    const studentAnalysis = computeStats();
    console.log("  i am data ", studentAnalysis)
    const stats = document.getElementById("stats");
    if (!stats) return;
    console.log("i am software engineer", stats);
    stats.innerHTML = `
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.total}</stat>
     <div class="stat-level">Total Students</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.average}</stat>
     <div class="stat-level">Averge Score</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.highest}</stat>
     <div class="stat-level">Highest Score</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.passing}</stat>
     <div class="stat-level">Passing</div>
    </div>
    
    `
}




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

    currentPage = page;

    console.log("Switched to page:", currentPage);

    renderTable();
}

// 🔥 ADD THIS LINE
window.changePage = changePage;


// buttons += `<button data-page="${i}" class="page-btn">${i}</button>`;

// document.getElementById("pagination").addEventListener("click", (e) => {
//     if (e.target.classList.contains("page-btn")) {
//         const page = Number(e.target.dataset.page);
//         changePage(page);
//     }
// });



function getGrade(score) {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 60) return "C";
    return "F"
}



document.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-btn")) {
        const id = e.target.dataset.id;
        removeStudent(id);
    }
})


// function removeStudent(id) {
//     console.log('Removing student:', id);
//     students = students.filter((s) => s.id != id);
//     render();
// }


function removeStudent(id) {
    console.log('Removing student:', id);

    const index = students.findIndex(s => s.id == id);

    if (index !== -1) {
        students.splice(index, 1);
    }

    render();
}

// window.removeStudent = function (id) {
//     console.log('Removing student:', id);
//     students = students.filter((s) => s.id != id);
//     render();
// };


// Toogle : Add student

// function toggleForm() {
//     document.getElementById("addForm").classList.toggle("open");
// }


// window.toggleForm = function () {
//     document.getElementById("addForm").classList.toggle("open");
// };


// document.querySelector(".btn-prdimary")
//     .addEventListener("click", () => {
//         document.getElementById("addForm").classList.toggle("open");
//     });


// document.querySelector(".stdForm")
//     .addEventListener("click", () => {
//         document.getElementById("addForm").classList.toggle("open");
//     })

const btn = document.querySelector(".stdForm");
if (btn) {
    btn.addEventListener("click", () => {
        document.getElementById("addForm").classList.toggle("open");
    });
}

window.addStudent = addStudent;

function addStudent() {
    const name = document.getElementById("newName").value.trim();
    const score = parseInt(document.getElementById("newScore").value);
    const subject = document.getElementById("newSubject").value.trim();

    if (!name || isNaN(score) || score < 0 || score > 100 || !subject) {
        alert("Please fill in all fields coorectly.");
        return;
    }
    const newId = students.length > 0
        ? Math.max(...students.map(s => s.id)) + 1
        : 1;

    students.push({ id: newId, name, subject, score });

    // Clear form
    document.getElementById("newName").value = "";
    document.getElementById("newScore").value = "";
    document.getElementById("newSubject").value = "";
    // toggleForm();
    render();
}


