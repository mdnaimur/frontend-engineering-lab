import { students } from '../data/student_data.js';
import { render } from '../render.js';
import { toggleAddbtn } from '../utils/toggleAddbtn.js';

export function addStudent() {
    toggleAddbtn();
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
