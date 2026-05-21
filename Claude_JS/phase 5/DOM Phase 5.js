const el = document.querySelector('#message');

// Text content — safe, treats everything as plain text
el.textContent = "Hello, World!";
console.log(el.textContent);

// HTML content — parses HTML tags, use carefully
el.innerHTML = "Hello <strong>World</strong>!";

// SECURITY WARNING — never put user input into innerHTML
const userInput = '<img src=x onerror="alert(\'hacked!\')">';
el.innerHTML = userInput;        // XSS attack! Never do this
el.textContent = userInput;      // safe — renders as plain text