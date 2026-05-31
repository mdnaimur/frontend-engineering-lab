// console.log("Student Data Manager - R3");

import { students } from './data/students_data.js';

import { render } from './render.js';




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


