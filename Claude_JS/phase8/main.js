// localStorage.setItem('lunch', 'cereal');

// console.log(localStorage.getItem('breakfast'));

// // localStorage.removeItem('lunch');
// console.dir(localStorage)
// localStorage.clear();

// sessionStorage.setItem('dinner', 'eggs');
// console.log(sessionStorage.getItem('breakfast'));

// console.log(document.cookie)
// document.cookie = "hello=true"


// localStorage.setItem('theme', 'dark');
// localStorage.setItem('language', 'en');

// const user = { name: 'Ayesha', role: 'admin', score: 42 };
// localStorage.setItem('user', JSON.stringify(user));

// const rawUser = localStorage.getItem('user');
// const parsedUser = rawUser ? JSON.parse(rawUser) : null;
// console.log(parsedUser); //



// Raw localStorage crashes if storage is full or in private mode
// Always wrap it

// const storage = {
//     get(key, fallback = null) {
//         try {
//             const item = localStorage.getItem(key);
//             return item ? JSON.parse(item) : fallback;
//         } catch {
//             return fallback;
//         }
//     },

//     set(key, value) {
//         try {
//             localStorage.setItem(key, JSON.stringify(value));
//             return true;
//         } catch {
//             console.warn(`Storage failed for key: ${key}`);
//             return false;
//         }
//     },

//     remove(key) {
//         try {
//             localStorage.removeItem(key);
//         } catch { /* silent */ }
//     }
// };

// // Usage — clean, safe, handles objects automatically
// storage.set('settings', { theme: 'dark', fontSize: 16, lang: 'en' });
// const settings = storage.get('settings', { theme: 'light' }); // fallback if missing

// console.log(settings);

// document.cookie = [
//     'sessionId=abc123',
//     'max-age=86400',      // expires in 86400 seconds = 1 day
//     'path=/',             // available on all pages
//     'SameSite=Strict',    // CSRF protection
//     // 'Secure',          // HTTPS only (uncomment in production)
//     // 'HttpOnly',        // JS can't read it — server-only (set by server)
// ].join('; ');

// // console.log(document.cookie);

// function getCookie(name) {
//     const cookies = document.cookie
//         .split('; ')
//         .find(row => row.startsWith(`${name}=`));
//     return cookies ? decodeURIComponent(cookies.split('=')[1]) : null;
// }



// console.log(getCookie('username'));
// getCookie('missing');

// const display = document.getElementById("display");


// function getLocation() {
//     if (navigator.geolocation) {
//         // navigator.geolocation.getCurrentPosition(showPosition, showError);
//         navigator.geolocation.watchPosition(showPosition, showError);
//     }

//     else {
//         display.innerHTML("Geolocation is not available in your browser");
//     }
// }


// function showPosition(position) {
//     display.innerHTML = "Latitude: " + position.coords.latitude + "<br/>Longitude: " + position.coords.longitude;


// }

// function showError(error) {
//     console.log(error);

//     switch (error.code) {
//         case error.PERMISSION_DENIED:
//             display.innerHTML = "User denied the request for Geolocation."
//             break;
//         case error.POSITION_UNAVAILABLE:
//             display.innerHTML = "Location information is unavailable."
//             break;
//         case error.TIMEOUT:
//             display.innerHTML = "The request to get user location timed out."
//             break;
//         case error.UNKNOWN_ERROR:
//             display.innerHTML = "An unknown error occurred."
//             break;
//     }
// }


async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);

        console.log("Copied!");
        return true;

    } catch (error) {
        console.error("Copy failed:", error);
        return false;
    }
}

document.querySelectorAll(".copy-btn").forEach(btn => {

    btn.addEventListener("click", async () => {

        const code = btn
            .closest(".code-block")
            .querySelector("code")
            .textContent;

        const success = await copyToClipboard(code);

        if (success) {

            const originalText = btn.textContent;

            btn.textContent = "Copied!";

            setTimeout(() => {
                btn.textContent = originalText;
            }, 2000);
        }
    });

});