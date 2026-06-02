import { students } from '../data/student_data.js';

export function convertJson() {
    const data = students;

    const jsonBox = document.getElementById("jsonBox");
    console.log("i am from json");

    if (!jsonBox) {
        console.error("jsonBox not found");
        return;
    }
    const json = JSON.stringify(data, null, 2);
    document.getElementById("jsonBox").textContent = json;

    const parsed = JSON.parse(json);
    console.log("First student name:", parsed[0].name);
}