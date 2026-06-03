import { students } from '../data/student_data.js';
import { getGrade } from './getGrade.js';

export function getFilterStudents() {


    const search = document.getElementById("searchInput").value.toLowerCase();
    const grade = document.getElementById("filterGrade").value;
    const sortKey = document.getElementById("sortBy").value;


    return [...students]
        .filter((s) => s.name.toLowerCase().includes(search))
        .filter((s_grade) => (grade ? getGrade(s_grade.score) === grade : true))
        .sort((a, b) => {
            if (sortKey == 'name') return a.name.localeCompare(b.name);
            if (sortKey == 'score') return b.score - a.score;
            if (sortKey == 'grade') return getGrade(a.score).localeCompare(getGrade(b.score));

        })
}