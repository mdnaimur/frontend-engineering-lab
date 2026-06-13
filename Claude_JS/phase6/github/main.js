// STATE
let isLoading = false;

// UI helpers
function showLoading() {
    isLoading = true;
    document.getElementById('loading').classList.add('visible');
    document.getElementById('profileCard').classList.remove('visible');
    document.getElementById('error').classList.remove('visible');
    document.getElementById('searchBtn').disabled = true;
}

function hideLoading() {
    isLoading = false;
    document.getElementById('loading').classList.remove('visible');
    document.getElementById('searchBtn').disabled = false;
}

function showError(message) {
    const el = document.getElementById('error');
    el.textContent = message;
    el.classList.add('visible');
}


// DATA FETCHING — two parallel requests
async function fetchGitHubData(username) {
    const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`)
    ]);

    // GitHub returns 404 for unknown users
    if (profileRes.status === 404) throw new Error(`User "${username}" not found.`);
    if (!profileRes.ok) throw new Error(`GitHub API error: ${profileRes.status}`);

    const profile = await profileRes.json();
    const repos = await reposRes.json();
    return { profile, repos };
}



// RENDER — populate DOM from data
function renderProfile(profile, repos) {

    console.log(repos);
    console.dir(repos);
    // Profile header
    document.getElementById('avatar').src = profile.avatar_url;
    document.getElementById('fullName').textContent = profile.name || profile.login;
    document.getElementById('loginName').textContent = `@${profile.login}`;
    document.getElementById('bio').textContent = profile.bio || '';

    // Stats
    document.getElementById('reposCount').textContent = profile.public_repos.toLocaleString();
    document.getElementById('followersCount').textContent = profile.followers.toLocaleString();
    document.getElementById('followingCount').textContent = profile.following.toLocaleString();

    // Meta
    const joined = new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    document.getElementById('location').textContent = profile.location ? `📍 ${profile.location}` : '';
    document.getElementById('company').textContent = profile.company ? `🏢 ${profile.company}` : '';
    document.getElementById('joined').textContent = `📅 Joined ${joined}`;
    const blogEl = document.getElementById('blog');
    blogEl.innerHTML = profile.blog
        ? `🔗 <a href="${profile.blog}" target="_blank" style="color:#388bfd">${profile.blog}</a>`
        : '';

    // Repos
    document.getElementById('repoList').innerHTML = repos.map(repo => `
      <div class="repo">
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <div class="repo-desc">${repo.description || 'No description'}</div>
        <div class="repo-meta">
          <span>⭐ ${repo.stargazers_count.toLocaleString()}</span>
          <span>🍴 ${repo.forks_count.toLocaleString()}</span>
          ${repo.language ? `<span>● ${repo.language}</span>` : ''}
        </div>
      </div>
    `).join('');

    document.getElementById('profileCard').classList.add('visible');
}

// MAIN HANDLER
async function searchUser() {
    const username = document.getElementById('usernameInput').value.trim();
    if (!username || isLoading) return;

    showLoading();

    try {
        const { profile, repos } = await fetchGitHubData(username);
        renderProfile(profile, repos);
    } catch (error) {
        showError(error.message);
    } finally {
        hideLoading(); // always runs — even if there was an error
    }
}

// Events
document.getElementById('searchBtn').addEventListener('click', searchUser);
document.getElementById('usernameInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchUser();
});

// Load a default profile on startup
document.getElementById('usernameInput').value = 'mdnaimur';
searchUser();