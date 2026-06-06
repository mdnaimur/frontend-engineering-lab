/// Lecture 5: DOM manupulation


// console.log(document);
// console.log(typeof (document));
// console.dir(document);
// console.log(document.title);
// document.title = 'Lecture 5 DOM manupulation';
// console.log(document.URL);
// console.log(document.domain);
// console.log(document.head);
// console.log(document.all);
// console.log(document.all[5]);

// for (let element of document.all) {
//     console.log(element);
// }


/// get  ElementById

// console.log(document.getElementById)

// const items = document.getElementsByTagName('p');
// console.log(items)


// const h1 = document.querySelector('h1');

// console.log(h1.textContent);

// h1.textContent = 'Hi Js'

// console.log(h1.textContent);

// const elemment_p = document.getElementById("first");

// // elemment_p.style.backgroundColor = 'yellow';
// elemment_p.style.color = 'red';

// let btn = document.getElementById('btnRate');
// let output = document.getElementById('output');

// btn.addEventListener('click', () => {
//     let rates = document.getElementsByName('rate');

//     rates.forEach((rate) => {
//         if (rate.checked) {
//             output.innerText = `You Selected: ${rate.value}`;
//         }
//     })
// });


// let countBtn = document.getElementById('btnCount');

// countBtn.addEventListener('click', () => {
//     let headings = document.getElementsByTagName('h2');
//     alert(`The number of H2 tags: ${headings.length}`);
// });


// let element = document.querySelector('*');

// console.log(element);

// let elementall = document.querySelectorAll('*');

// console.log(elementall);

// elementall.forEach((el) => {
//     console.log("Individual ", el.dataset);
// })

// let firstHeading = document.querySelector('h1');

// console.log(firstHeading);

// let heading2 = document.querySelectorAll('h2');

// console.log(heading2);

// let note = document.querySelector('.menu-item');
// console.log(note);


// let current = document.querySelector('.current');
// console.log(current.textContent);

// current.textContent = 'Help Customer';
// current.style.fontSize = '24px';
// current.style.color = 'red';

// console.log(current.parentNode);
// console.log(current.parentNode.textContent);

// current.parentNode.style.backgroundColor = '#000';
// current.parentNode.style.color = '#fff';
// current.parentNode.style.padding = '30px';

// let nextSibling = current.nextElementSibling;
// console.log(nextSibling);
// console.log(nextSibling.textContent);
// console.log(nextSibling.innerHTML);

// nextSibling.innerText = 'Jobs';
// nextSibling.style.fontSize = '30px';

// while (nextSibling) {
//     console.log(nextSibling);
//     nextSibling = nextSibling.nextElementSibling;
// }


// /// previous sibling

// console.log("============================");
// let prevSibling = current.previousElementSibling;

// console.log(prevSibling);
// console.log(prevSibling.firstChild);


// let getSiblings = function (e) {
//     // for collecting siblings
//     let siblings = [];
//     // if no parent, return no sibling
//     if (!e.parentNode) {
//         return siblings;
//     }
//     // first child of the parent node
//     let sibling = e.parentNode.firstChild;
//     // collecting siblings
//     while (sibling) {
//         if (sibling.nodeType === 1 && sibling !== e) {
//             siblings.push(sibling);
//         }
//         sibling = sibling.nextSibling;
//     }
//     return siblings;
// };

// let siblings = getSiblings(document.querySelector('.current'));
// siblingText = siblings.map(e => e.innerHTML);
// console.log(siblingText);


// let div = document.createElement('div');
// div.id = 'content';
// div.className = 'note';

// // create a new heading and add it to the div
// let h2 = document.createElement('h2');
// h2.textContent = 'Add h2 element to the div';
// div.appendChild(h2);

// // add div to the document
// document.body.appendChild(div);

// let script = document.createElement('script');
// script.src = '/lib.js';
// document.body.appendChild(script);

// function loadJS(url) {
//     let script = document.createElement('script');
//     script.src = url;
//     document.body.appendChild(script);
// }


// function createMenuItem(name) {
//     let li = document.createElement('li');
//     li.textContent = name;
//     return li;
// }
// // get the ul#menu
// const menu = document.querySelector('#menu');
// // add menu item
// menu.appendChild(createMenuItem('Home'));
// menu.appendChild(createMenuItem('Services'));
// menu.appendChild(createMenuItem('About Us'));


// const scriptHTML = `<script>alert("Alert from innerHTML");</script>`;
// const main = document.getElementById('main');
// const externalHTML = `<img src='1' onerror='alert("Error loading image")'>`;
// main.innerHTML = externalHTML;




// let div = document.querySelector('.container');
// let fragment = document.createDocumentFragment();
// console.time("div without fragment");

// for (let i = 0; i < 100000; i++) {
//     let p = document.createElement('p');
//     p.textContent = `Paragraph ${i}`;
//     fragment.appendChild(p);
// }
// // append the fragment to the DOM tree
// div.appendChild(fragment);

// console.timeEnd("div without fragment");

// let div = document.querySelector('.container');

// const fragment = document.createDocumentFragment();

// console.time("div with fragment");

// for (let i = 0; i < 100000; i++) {
//     let p = document.createElement('p');
//     p.textContent = `Paragraph frgrmt ${i}`;
//     fragment.appendChild(p);
// }

// div.appendChild(fragment);

// console.timeEnd("div with fragment");

// let count = 0;

// function test() {
//     count++;
//     test();
// }

// try {
//     test();
// } catch (e) {
//     console.log(count);
// }

// let count = 0;

// function test() {
//     count++;
//     console.log(count);
//     test();
// }

// try {
//     test();
// }
// catch (e) {
//     console.log("catch block [DEBUG]: ", count);
//     console.error("catch block error [DEBUG]: ", count);
//     console.log("catch block e [DEBUG]: ", e);
//     console.error("catch block e [DEBUG]: ", e);
// }



// const p = document.querySelector("p");

// const h1 = document.createElement('h1');
// h1.innerText = 'JavaScript DOM with before fucntion';

// p.before(h1);

// const h2 = document.createElement('h2');
// h2.innerText = 'JavaScript DOM with after() fucntion';
// p.after(h2);


// const list = document.querySelector('ul');

// const libs = ['React', 'Nextjs', "Odoo", "Python", "postgresql"];

// const items = libs.map((lib) => {
//     const item = document.createElement('li');
//     item.innerText = lib;
//     return item;
// })

// console.log(list.firstChild.before);

// list.firstChild.before(...items);

// const button = document.querySelector('button');

// let list = document.querySelector('#list');

// list.insertAdjacentHTML('beforebegin', '<h2>Web Technology</h2>');
// list.insertAdjacentHTML('afterbegin', '<li>HTML</li>');
// list.insertAdjacentHTML('beforeend', '<li>JavaScript</li>');
// list.insertAdjacentHTML('afterend', '<p>For frontend developers</p>');
// button.firstChild.before('🧡 ');


// let menu = document.getElementById('menu');

// let li = document.createElement('li');
// li.textContent = 'Home';
// if (menu.firstElementChild) {
//     menu.replaceChild(li, menu.firstElementChild);
// } else {
//     menu.appendChild(li);
// }

// let menu = document.querySelector('#menu');
// let clonedMenu = menu.cloneNode(true);
// clonedMenu.id = 'menu-mobile';
// document.body.appendChild(clonedMenu);


// const menu = document.querySelector('#menu');

// if (menu) {
//     const clonedMenu = menu.cloneNode(true);
//     clonedMenu.id = 'menu-mobile';

//     document.body.appendChild(clonedMenu);
// }

// let app = document.querySelector("#app");

// let langs = ['Typescript', 'Reactjs', 'Nextjs', 'CSS'];

// let nodes = langs.map((lang) => {
//     let li = document.createElement('li');
//     li.textContent = lang;
//     return li;
// })

// app.append(...nodes);

// let input = document.querySelector('#username');

// for (let attr of input.attributes) {
//     console.log(`${attr.name} = ${attr.value}`);

// }


// input.setAttribute('tabindex', 2);
// console.log(input.tabIndex);  // 2

// input.setAttribute('value', 'guest');
// console.log(input.value);

// input.value = 'admin';
// console.log(input.getAttribute('value')); // guest

// let checkbox = document.querySelector('#chkAccept');
// console.log(checkbox.checked);


// let input = document.querySelector('#password');

// let styleAttr = input.getAttribute('style');
// console.log(styleAttr);

// console.dir(input.style);

// let bar = document.querySelector('#main');
// console.log(bar.dataset);


// const btnSend = document.querySelector('#btnSend');

// if (btnSend) {
//     btnSend.setAttribute('name', 'send');
//     btnSend.setAttribute('disabled', '');

// }


// let link = document.querySelector('#js');
// if (link) {
//     let target = link.getAttribute('target');
//     console.log(target);

//     let title = link.getAttribute('title');
//     console.log(title);
// }


// let btn = document.querySelector('#btnSend');
// if (btn) {
//     let disabled = btn.hasAttribute('disabled');
//     console.log(disabled);
// }

// let menu = document.querySelector('#menu');
// console.log(menu.className);

// menu.className += ' new';
// console.log(menu.className);

// menu.classList.add('new');
// console.log(menu.className);

// let div = document.querySelector('#content');
// for (let cssClass of div.classList) {
//     console.log(cssClass);
// }


// let box = document.querySelector('.box');
// let width = box.offsetWidth;
// let height = box.offsetHeight;

// console.log({ width, height });

// const domRect = box.getBoundingClientRect();
// console.log(domRect);


// function handleClick() {
//     preventDefault();
//     alert('It was clicked!');
// }

// btn.addEventListener('click', handleClick);



// function greet(name) {
//     console.log(`Hello ${name}`);
// }

// function processUser(callback) {
//     callback("Naimur");
// }

// processUser(greet);

// let btn = document.querySelector('#btn');

// btn.addEventListener('click', function (event) {
//     console.log('The button was clicked!');
//     event.stopPropagation();
// });

// document.body.addEventListener('click', function (event) {
//     console.log('The body was clicked!');
// });

// btn.addEventListener('click', function (event) {
//     alert(event.type); // click
// });


// addEventListener('DOMContentLoaded', (event) => {
//     console.log('The DOM is fully loaded.');
// });

// addEventListener('load', (event) => {
//     console.log('The page is fully loaded.');
// });

// addEventListener('beforeunload', (event) => {
//     // show the confirmation dialog
//     event.preventDefault();
//     // Google Chrome requires returnValue to be set.
//     event.returnValue = '';
// });

// addEventListener('unload', (event) => {
//     // send analytic data
// });

// window.addEventListener('beforeunload', (event) => {
//     event.preventDefault();
//     // Google Chrome requires returnValue to be set.
//     event.returnValue = '';
// });


// let btn = document.querySelector('#btn');


// // disable context menu when right-mouse clicked
// btn.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });


// // show the mouse event message

// btn.addEventListener('mouseup', (e) => {
//     let msg = document.querySelector('#message');
//     switch (e.button) {
//         case 0:
//             msg.textContent = 'Left mouse button clicked.';
//             break;
//         case 1:
//             msg.textContent = 'Middle mouse button clicked.';
//             break;
//         case 2:
//             msg.textContent = 'Right mouse button clicked.';
//             break;
//         default:
//             msg.textContent = `Unknown mouse button code: ${event.button}`;
//     }
// });


// let btnKeys = document.querySelector('#btnKeys');

// btnKeys.addEventListener('click', (e) => {
//     let keys = [];

//     if (e.shiftKey) keys.push('shift');
//     if (e.ctrlKey) keys.push('ctrl');
//     if (e.altKey) keys.push('alt');
//     if (e.metaKey) keys.push('meta');

//     let msg = document.querySelector('#messageKeys');
//     msg.textContent = `Keys: ${keys.join('+')}`;
// });

// let track = document.querySelector('#track');
// track.addEventListener('mousemove', (e) => {
//     let log = document.querySelector('#log');
//     log.innerText = `
//             Screen X/Y: (${e.screenX}, ${e.screenY})
//             Client X/Y: (${e.clientX}, ${e.clientY})`
// });

// let textBox = document.getElementById('message');
// textBox.addEventListener('keydown', (event) => {
//     console.log(`key=${event.key},code=${event.code}`);

// });

// window.addEventListener('scroll', (event) => {
//     console.log('Scrolling...');
// });

// let control = document.querySelector('#control');

// control.addEventListener('click', function (e) {
//     // get the scrollDemo
//     let div = document.getElementById('scrollDemo');
//     // get the target
//     let target = e.target;
//     // handle each button's click
//     switch (target.id) {
//         case 'btnScrollLeft':
//             div.scrollLeft += 20;
//             break;

//         case 'btnScrollTop':
//             div.scrollTop += 20;
//             break;
//     }
// });


// const pwd = document.querySelector('input[type="password"]');

// pwd.addEventListener('focus', (e) => {
//     e.target.style.backgroundColor = 'yellow';
// });

// pwd.addEventListener('blur', (e) => {
//     e.target.style.backgroundColor = 'red';
// });


// let docFrom = document.forms;

// console.log(docFrom);

// for (df of docFrom) {
//     console.log(df);
// }

function showMessage(input, message, type) {
    // get the small element and set the message
    const msg = input.parentNode.querySelector("small");
    msg.innerText = message;
    // update the class for the input
    input.className = type ? "success" : "error";
    return type;
}


function showError(input, message) {
    return showMessage(input, message, false);
}

function showSuccess(input) {
    return showMessage(input, "", true);
}

function hasValue(input, message) {
    if (input.value.trim() === "") {
        return showError(input, message);
    }
    return showSuccess(input);
}

function validateEmail(input, requiredMsg, invalidMsg) {
    // check if the value is not empty
    if (!hasValue(input, requiredMsg)) {
        return false;
    }
    // validate email format
    const emailRegex =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const email = input.value.trim();
    if (!emailRegex.test(email)) {
        return showError(input, invalidMsg);
    }
    return true;
}

const form = document.querySelector("#signup");

const NAME_REQUIRED = "Please enter your name";
const EMAIL_REQUIRED = "Please enter your email";
const EMAIL_INVALID = "Please enter a correct email address format";

form.addEventListener("submit", function (event) {
    // stop form submission
    event.preventDefault();

    // validate the form
    let nameValid = hasValue(form.elements["name"], NAME_REQUIRED);
    let emailValid = validateEmail(form.elements["email"], EMAIL_REQUIRED, EMAIL_INVALID);
    // if valid, submit the form.
    if (nameValid && emailValid) {
        alert("Demo only. No form was posted.");
    }
});