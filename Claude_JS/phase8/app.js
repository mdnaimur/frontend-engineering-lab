console.log("I am working inside Phase 8");


localStorage.setItem('theme', 'dark');
localStorage.setItem('language', 'en');

const user = {
    name: "Md Naimur Rahman",
    role: "admin",
    score: 42
}

localStorage.setItem('user', JSON.stringify(user));
const mission = localStorage.getItem('nope');
console.log(mission)

const rawUser = localStorage.getItem('user');
console.log(" i ma raw user", rawUser);
const parsedUser = rawUser ? JSON.parse(rawUser) : null;
console.log(parsedUser.name); // "Ayesha"

localStorage.removeItem('theme');   // remove one key
localStorage.clear();

localStorage.setItem('preference', 'dark');
// Close the browser, reopen — still there ✓

// sessionStorage — dies when the TAB is closed
// sessionStorage.setItem('formDraft', JSON.stringify(formData));
// console.log()

const storage = {
    get(key, fallback = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON > parse(item) : fallback
        }
        catch {
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        }
        catch {
            console.warn(`Storage failed for key: ${key}`);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch { /* silent */ }
    }
}


storage.set('settings', { theme: 'dark', fontSize: 16, lang: 'en' });
const settings = storage.get('settings', { theme: 'light' });

console.log("==============cookies===============")
document.cookie = 'username=Ayesha';

document.cookie = [
    'sessionId=abc123',
    'max-age=86400',      // expires in 86400 seconds = 1 day
    'path=/',             // available on all pages
    'SameSite=Strict',    // CSRF protection
    // 'Secure',          // HTTPS only (uncomment in production)
    // 'HttpOnly',        // JS can't read it — server-only (set by server)
].join('; ');


console.log(document.cookie);



// Professional cookie reader
function getCookie(name) {
    const cookies = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`));
    return cookies ? decodeURIComponent(cookies.split('=')[1]) : null;
}

getCookie('username');  // "Ayesha"
getCookie('missing');

document.cookie = 'username=; max-age=0; path=/';


console.log("==============Geolocation API ===============");

// ─── ONE-TIME POSITION ─────────────────────────────────
function getLocation() {
    // Browser will ask user for permission first
    if (!navigator.geolocation) {
        console.error("Geolocation not supported");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            console.log(`Lat: ${latitude}, Lng: ${longitude}`);
            console.log(`Accuracy: ${accuracy} meters`);
            console.log(`Timestamp: ${new Date(position.timestamp)}`);
        },
        // Error callback
        (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("User denied location access");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Location unavailable");
                    break;
                case error.TIMEOUT:
                    console.error("Request timed out");
                    break;
            }
        },
        // Options
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
}

// ─── CONTINUOUS TRACKING ───────────────────────────────
let watchId;

function startTracking() {
    watchId = navigator.geolocation.watchPosition(
        (position) => {
            updateMapMarker(position.coords.latitude, position.coords.longitude);
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
    );
}

function stopTracking() {
    navigator.geolocation.clearWatch(watchId); // always clean up!
}

// ─── ASYNC WRAPPER — modern, clean ─────────────────────
function getCurrentPosition(options = {}) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

// Now you can use async/await with geolocation
async function showNearbyRestaurants() {
    try {
        const position = await getCurrentPosition({ enableHighAccuracy: true });
        const { latitude, longitude } = position.coords;
        const restaurants = await fetchNearby(latitude, longitude);
        renderList(restaurants);
    } catch (error) {
        showError("Could not get your location.");
    }
}

console.log("==============Geolocation API ===============");
// ─── MODERN CLIPBOARD API ──────────────────────────────
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

async function readFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();
        return text;
    } catch (error) {
        console.error("Paste failed — permission denied");
        return null;
    }
}

// Real-world usage — copy code snippet button
document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const code = btn.closest('.code-block').querySelector('code').textContent;
        const success = await copyToClipboard(code);

        if (success) {
            const original = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => btn.textContent = original, 2000);
        }
    });
});


// ─── INTERSECTION OBSERVER — lazy loading, infinite scroll ─
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element just scrolled into view
            entry.target.classList.add('visible');

            // Lazy load image
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                observer.unobserve(img); // stop watching once loaded
            }
        }
    });
}, { threshold: 0.1 }); // trigger when 10% visible

document.querySelectorAll('.lazy-img').forEach(img => observer.observe(img));


// ─── RESIZE OBSERVER — react to element size changes ───
const resizeObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
        const { width, height } = entry.contentRect;
        console.log(`Element is now ${width}px × ${height}px`);
        // Rerender a chart, adjust layout, etc.
    }
});

resizeObserver.observe(document.querySelector('#chart-container'));


// ─── WEB NOTIFICATIONS ─────────────────────────────────
async function sendNotification(title, body) {
    if (!("Notification" in window)) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/badge.png',
    });
}

sendNotification("New message", "Ayesha sent you a file.");


// ─── PAGE VISIBILITY — pause work when tab is hidden ───
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseVideoPlayer();
        clearInterval(pollingInterval); // stop API polling
    } else {
        resumeVideoPlayer();
        pollingInterval = setInterval(pollForUpdates, 5000);
    }
});


// ─── NAVIGATOR — device information ────────────────────
console.log(navigator.language);      // "en-US"
console.log(navigator.onLine);        // true/false — internet connection
console.log(navigator.userAgent);     // browser/OS info string

window.addEventListener('online', () => showBanner("Back online ✓"));
window.addEventListener('offline', () => showBanner("No connection — working offline"));
// ─── RESIZE OBSERVER — react to element size changes ───
// const resizeObserver = new ResizeObserver(entries => {
//     for (const entry of entries) {
//         const { width, height } = entry.contentRect;
//         console.log(`Element is now ${width}px × ${height}px`);
//         // Rerender a chart, adjust layout, etc.
//     }
// });

// resizeObserver.observe(document.querySelector('#chart-container'));

// ─── WEB NOTIFICATIONS ─────────────────────────────────
async function sendNotification(title, body) {
    if (!("Notification" in window)) return;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    new Notification(title, {
        body,
        icon: '/favicon.ico',
        badge: '/badge.png',
    });
}

sendNotification("New message", "Ayesha sent you a file.");


// ─── PAGE VISIBILITY — pause work when tab is hidden ───
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pauseVideoPlayer();
        clearInterval(pollingInterval); // stop API polling
    } else {
        resumeVideoPlayer();
        pollingInterval = setInterval(pollForUpdates, 5000);
    }
});


// ─── NAVIGATOR — device information ────────────────────
console.log(navigator.language);      // "en-US"
console.log(navigator.onLine);        // true/false — internet connection
console.log(navigator.userAgent);     // browser/OS info string

window.addEventListener('online', () => showBanner("Back online ✓"));
window.addEventListener('offline', () => showBanner("No connection — working offline"))