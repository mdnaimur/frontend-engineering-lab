

export class HttpError extends Error {
    constructor(status, statusText, body) {
        super(`HTTP ${status}: ${statusText}`);
        this.name = "HttpError";
        this.status = status;
        this.statusText = statusText;
        this.body = body;
    }
}

export class NetworkError extends Error {
    constructor(message) {
        super(message);
        this.name = "NetworkError";
    }
}


export class TimeoutError extends Error {
    constructor(ms) {
        super(`Request timed out after &{ms}ms`)
        this.name = "TimeoutError";
    }
}


// try {
//     await getUser(id);
// }
// catch (err) {
//     if (err instanceof TimeoutError) {
//         showRetryButton();
//     }

//     if (err instanceof HttpError) {
//         if (err.status === 401) redirectTologin();
//         if (err.status === 404) showNotFound();
//     }
//     if (err instanceof NetworkError) { showOfflineBanner(); }
// }