console.log("🚀 Script started");

// DOM ready fix
document.addEventListener('DOMContentLoaded', () => {
    console.log("✅ DOM fully loaded");

    // ---------------------------
    // SELECTING ELEMENTS
    // ---------------------------
    const title = document.getElementById('title');
    console.log("By ID:\n", title);

    const btn = document.querySelector('.submit-btn');
    console.log("Query Selector (btn):", btn);

    const input = document.querySelector('#email');
    console.log("Input:", input);

    const firstCard = document.querySelector('.card');
    console.log("First card:", firstCard);

    const allCards = document.querySelectorAll('.card');
    console.log("All cards:", allCards);

    const allInputs = document.querySelectorAll('input');
    console.log("All inputs:", allInputs);

    // Loop NodeList
    console.log("Card item count........................\n")
    allCards.forEach((card, index) => {
        console.log(`Card ${index}:`, card.textContent);
    });

    // ---------------------------
    // TEXT VS HTML
    // ---------------------------
    const el = document.querySelector('#message');

    el.textContent = "Hello, World!";
    console.log("textContent:", el.textContent);

    el.innerHTML = "Hello <strong>World</strong>!";
    console.log("innerHTML:", el.innerHTML);

    // SECURITY TEST
    const userInput = '<img src=x onerror="alert(\'hacked!\')">';
    console.log("⚠️ Unsafe innerHTML would execute JS!");
    el.textContent = userInput; // safe

    // ---------------------------
    // STYLE & CLASSES
    // ---------------------------
    const box = document.querySelector('.box');

    box.style.backgroundColor = '#b37211';
    box.style.padding = '1rem';

    console.log("Box styled");

    box.classList.add('active');
    console.log("Added class active");

    box.classList.toggle('expanded');
    console.log("Toggled expanded");

    console.log("Contains active?", box.classList.contains('active'));

    // ---------------------------
    // ATTRIBUTES
    // ---------------------------
    const img = document.querySelector('img');
    const link = document.querySelector('a');

    img.setAttribute('src', 'https://via.placeholder.com/100');
    img.setAttribute('alt', 'Profile photo');

    input.setAttribute('placeholder', 'Enter email...');
    input.disabled = true;
    console.log("Input disabled");

    input.disabled = false;
    console.log("Input enabled");

    link.href = 'https://example.com';

    console.log("Input value:", input.value);
    console.log("Image alt:", img.getAttribute('alt'));

    // ---------------------------
    // CREATE ELEMENT (FUNCTION)
    // ---------------------------
    function createCard(title, description) {
        console.log("Creating card:", title);

        const card = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        const btn = document.createElement('button');

        card.classList.add('card');
        h3.textContent = title;
        p.textContent = description;
        btn.textContent = 'Read more';

        card.appendChild(h3);
        card.appendChild(p);
        card.appendChild(btn);

        return card;
    }

    const container = document.querySelector('#container');

    const newCard = createCard('JavaScript', 'The language of the web');

    container.appendChild(newCard);
    console.log("Card appended");

    const anotherCard = createCard('Python', 'Backend powerhouse');
    container.prepend(anotherCard);
    console.log("Card prepended");


    function createMyCard(title, desc, salary) {
        const card = document.createElement("div");
        const h1 = document.createElement("h1");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");
        const btn = document.createElement("button");

        card.classList.add('card');
        h1.textContent = title;
        h4.textContent = desc;
        p.textContent = salary;
        btn.textContent = "read more"

        card.appendChild(h1);
        card.appendChild(h4);
        card.appendChild(p);

        return card;

    }

    const containerr = document.querySelector('#containerr');

    const newMember = createMyCard('Md Naimur Rahman', 'software engineer', 65000);
    containerr.appendChild(newMember)
    console.log("new card", newMember);
    const newMember2 = createMyCard('MNRD', 'CSE', 65000);

    containerr.appendChild(newMember2)
    console.log("new card2", newMember2);


    // ---------------------------
    // REMOVE ELEMENT
    // ---------------------------
    const oldCard = document.querySelector('.card');

    setTimeout(() => {
        oldCard.remove();
        console.log("Old card removed");
    }, 2000);

});



const btn = document.querySelector('#myBtn');

// Method 1: addEventListener — always use this
btn.addEventListener('click', function (event) {
    console.log('Button clicked!');
    console.log(event);           // the event object — full of useful info
    console.log(event.target);    // the element that was clicked
});

// Arrow function version — same thing
btn.addEventListener('click', (e) => {
    e.target.textContent = 'Clicked!';
    e.target.disabled = true;
});

// Method 2: onclick property — only one handler allowed, avoid
btn.onclick = () => console.log('clicked'); // overwrites any previous handler



// document.querySelector('form').addEventListener('submit', (e) => {
//     e.preventDefault();           // stop the page from refreshing — critical!
//     console.log(e.target);        // the form element
//     console.log(e.type);          // "submit"
// });

// document.addEventListener('keydown', (e) => {
//     console.log(e.key);           // "Enter", "a", "ArrowUp", etc.
//     console.log(e.ctrlKey);       // true if Ctrl was held
//     if (e.key === 'Escape') closeModal();
// });

// document.querySelector('.box').addEventListener('mousemove', (e) => {
//     console.log(e.clientX, e.clientY);  // mouse coordinates
// });


// // User input
// input.addEventListener('input', (e) => console.log(e.target.value)); // fires on every keystroke
// input.addEventListener('change', (e) => console.log(e.target.value)); // fires on blur/enter
// input.addEventListener('focus', () => input.classList.add('active'));
// input.addEventListener('blur', () => input.classList.remove('active'));

// // Mouse
// btn.addEventListener('click', handler);
// btn.addEventListener('mouseenter', handler);  // hover in
// btn.addEventListener('mouseleave', handler);  // hover out

// // Keyboard
// document.addEventListener('keydown', handler);
// document.addEventListener('keyup', handler);



// // NAIVE approach — adds 100 listeners for 100 items
// document.querySelectorAll('.delete-btn').forEach(btn => {
//     btn.addEventListener('click', handleDelete); // 100 event listeners!
// });

// // PROBLEM: if you add new items dynamically, they have no listener

// // PROFESSIONAL approach — one listener on the parent
// document.querySelector('#list').addEventListener('click', (e) => {
//     // Check if what was clicked matches what we care about
//     if (e.target.matches('.delete-btn')) {
//         const id = e.target.dataset.id;
//         deleteItem(id);
//     }
//     if (e.target.matches('.edit-btn')) {
//         const id = e.target.dataset.id;
//         editItem(id);
//     }
// });

// const form = document.querySelector('#registrationForm');

// form.addEventListener('submit', (e) => {
//     e.preventDefault(); // always prevent default first

//     // Reading form values
//     const name = document.querySelector('#name').value.trim();
//     const email = document.querySelector('#email').value.trim();
//     const password = document.querySelector('#password').value;
//     const role = document.querySelector('#role').value;
//     const agreed = document.querySelector('#terms').checked; // checkbox

//     // Validate
//     if (!name) {
//         showError('name', 'Name is required');
//         return;
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         showError('email', 'Enter a valid email');
//         return;
//     }

//     // All good — process the data
//     console.log({ name, email, password, role, agreed });
//     form.reset(); // clear all fields
// });

// function showError(fieldId, message) {
//     const field = document.querySelector(`#${fieldId}`);
//     const error = field.nextElementSibling; // assumes error <span> follows input
//     error.textContent = message;
//     field.classList.add('error');
// }




console.log("🚀 Script Loaded");

// -----------------------------
// BASIC EVENTS
// -----------------------------
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Form submitted");
    console.log("Target:", e.target);
    console.log("Type:", e.type);
});

// Keyboard
document.addEventListener('keydown', (e) => {
    console.log("Key pressed:", e.key, "Ctrl:", e.ctrlKey);

    if (e.key === 'Escape') {
        console.log("Escape pressed → closing modal (demo)");
    }
});

// Mouse move
document.querySelector('.box').addEventListener('mousemove', (e) => {
    console.log("Mouse position:", e.clientX, e.clientY);
});

// -----------------------------
// INPUT EVENTS
// -----------------------------
const input = document.querySelector('#email');

input.addEventListener('input', (e) => {
    console.log("Typing:", e.target.value);
});

input.addEventListener('change', (e) => {
    console.log("Changed:", e.target.value);
});

input.addEventListener('focus', () => {
    console.log("Input focused");
    input.classList.add('active');
});

input.addEventListener('blur', () => {
    console.log("Input blurred");
    input.classList.remove('active');
});

// -----------------------------
// BUTTON EVENTS
// -----------------------------
// const btn = document.querySelector('.submit-btn');

function handler(e) {
    console.log("Button event:", e.type);
}

btn.addEventListener('click', handler);
btn.addEventListener('mouseenter', handler);
btn.addEventListener('mouseleave', handler);

// Keyboard
document.addEventListener('keyup', handler);

// -----------------------------
// EVENT DELEGATION
// -----------------------------
document.querySelector('#list').addEventListener('click', (e) => {
    if (e.target.matches('.delete-btn')) {
        const id = e.target.dataset.id;
        console.log("Delete item:", id);
    }

    if (e.target.matches('.edit-btn')) {
        const id = e.target.dataset.id;
        console.log("Edit item:", id);
    }
});

// -----------------------------
// FORM VALIDATION
// -----------------------------
const form = document.querySelector('#registrationForm');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log("🔍 Validating form...");

    const name = document.querySelector('#name').value.trim();
    const email = document.querySelector('#email').value.trim();
    const password = document.querySelector('#password').value;
    const role = document.querySelector('#role').value;
    const agreed = document.querySelector('#terms').checked;

    if (!name) {
        showError('name', 'Name is required');
        return;
    }

    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
        showError('email', 'Enter a valid email');
        return;
    }

    console.log("✅ Form Data:", { name, email, password, role, agreed });

    form.reset();
});

// -----------------------------
// ERROR HANDLING
// -----------------------------
function showError(fieldId, message) {
    const field = document.querySelector(`#${fieldId}`);
    const error = field.nextElementSibling;

    error.textContent = message;
    field.classList.add('error');

    console.log("❌ Error:", fieldId, message);
}