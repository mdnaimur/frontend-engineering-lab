import { getFilteredStudents } from '../utils/getFilteredStudents.js';

export function renderTable() {

    const tbody = document.getElementById("tableBody");
    const filtered_data = getFilteredStudents();
    // const filtered_data = students;
    // 🔥 pagination logic
    // ✅ STEP 1: calculate total pages FIRST
    const totalPages = Math.ceil(filtered_data.length / rowsPerPage);
    // ✅ STEP 2: FIX invalid page (VERY IMPORTANT)
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }

    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    const paginatedData = filtered_data.slice(start, end);

    console.log("Current Page:", currentPage);
    console.log("Showing Data:", paginatedData);

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

    // ✅ STEP 5: render pagination (AFTER everything)
    renderPagination(filtered_data.length);
}
