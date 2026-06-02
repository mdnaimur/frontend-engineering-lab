import { render } from './render.js';

import { addStudent } from './features/addStudent.js';

import { convertJson } from './features/convertJson.js';
import { toggleAddbtn } from './utils/toggleAddbtn.js';

document.addEventListener("DOMContentLoaded", () => {
    render();

});


// add stdd
toggleAddbtn();
document.querySelector(".stdAdd")
    .addEventListener("click", addStudent);



//json
const jsonBox = document.getElementById("jsonBox");

jsonBtn.addEventListener("click", () => {

    convertJson();
});
