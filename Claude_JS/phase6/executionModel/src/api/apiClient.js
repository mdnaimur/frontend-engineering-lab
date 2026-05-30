import { HttpError, NetworkError, TimeoutError } from "./errors.js";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const TIMEOUT_MS = 10000;
const MAX_RETRIES = 3;

async function request(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const config = {
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...getAuthHeader(),
            ...options.headers
        },
        signal: controller.signal,
        ...options
    };

    try {
        logRequest(options.method ?? "GET", url);

        const response = await fetch(url, config);
        clearTimeout(timeoutId);

        if (!response.ok) {
            let errorBody = null;

            try {
                errorBody = await response.json();

            }
            catch {
                errorBody = await response.text().catch(() => null);
            }
            throw new HttpError(response.status, response.statusText, errorBody);
        }
        const contentType = response.headers.get("Content-Type") ?? "";
        if (!contentType.includes("application/json")) {
            return null;
        }

        return response.json();
    }
    catch (err) {
        clearTimeout(timeoutId);

        if (err.name === "AbortError") {
            throw new TimeoutError(TIMEOUT_MS);
        }

        if (err instanceof HttpError) {
            throw err;
        }
        throw new NetworkError(err.message);

    }

}

// --- Retry logic .................................................

async function requestWithRetry(endpoint, options = {}, retries = MAX_RETRIES) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await request(endpoint, options);
        }
        catch (err) {
            const isLast = attempt === retries;
            const retryable = isRetryable(err);

            if (!retryable || isLast) {
                throw err;
            }
            // Exponential backoff : 200ms, 400ms, 800ms


            const delay = 200 * Math.pow(2, attempt - 1);
            console.warn(`Attempt ${attempt} faild -- retrying in ${delay}ms`);
            await sleep(delay);

        }
    }
}


function isRetryable(err) {
    if (err instanceof TimeoutError) return true;
    if (err instanceof NetworkError) return true;
    if (err instanceof HttpError) {
        // Retry server errors and rate limits — not client errors
        return err.status === 429 || err.status >= 500;
    }
    return false;

}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// function getAuthHeader() {
//     const token = localStorage.getItem("authToken");
//     return token ? { "Aythorizations": `Bearer &{token}` } : {}
// }



// function logRequest(method, url) {
//     if (process.env.NODE_ENV === "development") {
//         console.log(`→ ${method} ${url}`);
//     }
// }



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function log(message) {
    console.log(message);

    const logs = document.getElementById('logs');
    logs.textContent += message + '\n';
}

function logRequest(method, url) {
    log(`→ ${method} ${url}`);
}

function getAuthHeader() {
    const token = localStorage.getItem('authToken');

    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
}

function showStatus(message, type = 'loading') {
    const status = document.getElementById('status');

    status.className = `status ${type}`;
    status.textContent = message;
}



export const apiClient = {
    get(endpoint, options = {}) {
        return requestWithRetry(endpoint, {
            ...options,
            method: "GET"
        });
    },

    post(endpoint, body, options = {}) {
        return requestWithRetry(endpoint, {
            ...options,
            method: "POST",
            body: JSON.stringify(body)
        });

    },

    put(endpoint, body, options = {}) {
        return requestWithRetry(endpoint, {
            ...options,
            method: "PUT",
            body: JSON.strigify(body)
        });
    },

    patch(endpoint, body, options = {}) {
        return requestWithRetry(endpoint, {
            ...options,
            method: "PATCH",
            body: JSON.stringify(body)
        });
    },

    delete(endpoint, options = {}) {
        return requestWithRetry(endpoint, { ...options, method: "DELETE" });
    }
}