// dashboard.js
// Only talks to services — never touches fetch or apiClient
// Pure business logic and rendering

import { HttpError, NetworkError, TimeoutError } from "../api/errors.js";
import { postService } from "../api/postService.js";
import { userService } from "../api/userService.js";

export async function loadDashboard(userId) {
    showLoadingSpinner();
    console.time("dashboard");
    console.log("== dashboard ==")

    try {
        // Step 1: user is critical — fail fast if unavailable
        const user = await userService.getById(userId);

        // Step 2: remaining data — parallel, partial failure ok
        const [postsResult, allPostsResult] = await Promise.allSettled([
            userService.getPosts(userId),
            postService.getAll()
        ]);

        // Step 3: extract with fallbacks
        const posts = postsResult.status === "fulfilled"
            ? postsResult.value
            : [];

        const allPosts = allPostsResult.status === "fulfilled"
            ? allPostsResult.value
            : [];

        // Step 4: log what failed (for monitoring)
        if (postsResult.status === "rejected") {
            console.warn("User posts unavailable:", postsResult.reason.message);
        }

        console.timeEnd("dashboard");

        // Step 5: render
        renderDashboard({ user, posts, allPosts });
        showStatus("Dashboard loaded successfully", "success")

    } catch (err) {
        // Handle specific error types differently
        if (err instanceof TimeoutError) {
            showErrorBanner("Dashboard is taking too long. Please try again.");
            return;
        }

        if (err instanceof HttpError) {
            if (err.status === 401) { redirectToLogin(); return; }
            if (err.status === 404) { showNotFound("User not found"); return; }
            showErrorBanner(`Server error: ${err.body?.error ?? err.message}`);
            return;
        }

        if (err instanceof NetworkError) {
            showErrorBanner("No internet connection. Check your network.");
            return;
        }

        // Unexpected error — rethrow for global error handler
        throw err;

    } finally {
        hideLoadingSpinner(); // ALWAYS runs
    }
}


function renderDashboard({ user, posts, allPosts }) {
    console.log("═══════════════════════════════");
    console.log("       USER DASHBOARD          ");
    console.log("═══════════════════════════════");
    console.log(`User:   ${user.name}`);
    console.log(`Email:  ${user.email}`);
    console.log(`Posts:  ${posts.length} personal posts`);
    console.log(`Feed:   ${allPosts.length} total posts`);
    console.log("═══════════════════════════════");
    console.log("═══════════════════════════════");
    console.log("═══════════════════════════════");

    const dashboard = document.getElementById('dashboard');

    if (!dashboard) {
        console.error(
            "#dashboard element not found"
        );
        return;
    }

    dashboard.innerHTML = `
    <div class="grid">
          <div class="post">
            <h3>User Information</h3>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company?.name ?? "N/A"}</p>
          </div>

          <div class="post">
            <h3>Statistics</h3>
            <p><strong>User Posts:</strong> ${posts.length}</p>
            <p><strong>Total Feed Posts:</strong> ${allPosts.length}</p>
          </div>
        </div>

        <div style="margin-top: 30px;">
          <h2>User Posts</h2>
          <div class="grid">
            ${posts.slice(0, 6).map(post => `
              <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;





}

async function createDemoPost() {
    try {
        showStatus('⏳ Creating post...', 'loading');

        const post = await postService.create({
            title: 'Production API Client Demo',
            body: 'This post was created using the API client abstraction layer.',
            userId: 1
        });

        log(`✓ Created post with ID ${post.id}`);

        showStatus('✓ Post created successfully', 'success');

    } catch (err) {
        showStatus(`❌ ${err.message}`, 'error');
    }
}

// =====================================================
// EVENTS
// =====================================================

document.getElementById('loadBtn')
    .addEventListener('click', () => {
        loadDashboard(1);
    });

document.getElementById('createBtn')
    .addEventListener('click', () => {
        createDemoPost();
    });



function showLoadingSpinner() { console.log("⏳ Loading...loadingspinner"); }
function hideLoadingSpinner() { console.log("✓ Done - Hidespinner"); }
function showErrorBanner(msg) { console.error("❌ I am error message: >", msg); }
function showNotFound(msg) { console.warn("🔍", msg); }
function redirectToLogin() { console.log("→ /login"); }
function showStatus(message, type = 'loading') {
    const status = document.getElementById('status');

    status.className = `status ${type}`;
    status.textContent = message;
}
function log(message) {
    console.log(message);

    const logs = document.getElementById('logs');
    logs.textContent += message + '\n';
}
// Run it
loadDashboard(1);