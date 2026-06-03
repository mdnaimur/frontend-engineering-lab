import { students } from '../data/student_data.js';
import { render } from '../render.js';


export function removeStudent(id) {
    const index = students.findIndex(s => s.id == id);

    if (index !== -1) {
        students.splice(index, 1);
    }

    render();
}