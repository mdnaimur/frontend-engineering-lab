import { getFilterStudents } from '../utils/getFilterStudents.js';
import { getGrade } from '../utils/getGrade.js';


export function renderTable() {
    const tbody = document.getElementById("tableBody");

    // const filtered_data = students;
    const filtered_data = getFilterStudents();
    // console.time('students');
    // console.table(filtered_data);
    // console.timeEnd('students');




    tbody.innerHTML = filtered_data.map((s, index) => {
        const grade = getGrade(s.score);

        return `
          <tr>
            <td>${index + 1}</td>
            <td>${s.name}</td>
            <td>${s.subject}</td>
            <td>${s.score}</td>
            <td> <span class ="badge grade-${grade}" > ${grade}</span></td>
            <td> <button class="remove-btn" data-id="${s.id}" style="color:#dc2626; border:none; background:none; cursor:pointer; font-size:18px" title="Remove">x</button> </td>

        </tr>
        `

    }).join("");

}