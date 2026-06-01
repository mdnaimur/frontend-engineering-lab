import { students } from '../data/student_data.js';


export function ComputeStats() {

    const scores = students.map((s) => s.score);

    return {
        total: students.length,
        average: scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(2) : 0,
        highest: Math.max(...scores),
        passing: students.filter((s) => s.score > 60).length
    }
}