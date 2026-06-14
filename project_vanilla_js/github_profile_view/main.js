/**
 * 
 * searchBtn
 * evnet
 */


let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', searchUser);




/// search Funtion

async function searchUser() {

    const username = document.getElementById('usernameInput').value.trim();
    if (!username) return;

    showLoading();

    try {
        const { profile, repos } = await fetchGihubData(username);

        renderProfile(profile, repos);
    }

    catch (error) {
        showError(error);


    }
    finally {
        hideLoading();
    }

}


/// fetching data from github api

async function fetchGihubData(username) {
    const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?sort=stars&per_page=5`)
    ]);

    /// github error control , 404 or unknown users

    if (profileRes.status === 404) throw new Error(`User "${username} not found"`);
    if (!profileRes.ok) throw new Error(`GitHub API error : ${profileRes.status}`);

    const profile = await profileRes.json();
    const repos = await reposRes.json();

    return { profile, repos };
}




/// data show in frotend

function renderProfile(profile, repos) {

    // all value taken

    let avatar = document.getElementById('avatar');
    let fullName = document.getElementById('fullName');
    let loginName = document.getElementById('loginName');
    let bio = document.getElementById('bio');


    let reposCount = document.getElementById('reposCount');
    let followersCount = document.getElementById('followersCount');
    let followingCount = document.getElementById('followingCount');


    let location = document.getElementById('location');
    let company = document.getElementById('company');
    let blogEl = document.getElementById('blog');
    const joined = new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });


    let repoList = document.getElementById('repoList');

    avatar.src = profile.avatar_url;
    fullName.textContent = profile.name || profile.login;
    loginName.textContent = `@${profile.login}`;

    reposCount.textContent = profile.public_repos.toLocaleString();
    followersCount.textContent = profile.followers.toLocaleString();
    followingCount.textContent = profile.following.toLocaleString();

    location.textContent = profile.location ? `📍 ${profile.location}` : '';
    company.textContent = profile.company ? `🏢 ${profile.company}` : '';
    joined.textContent = `📅 Joined ${joined}`;
    blogEl.innerHTML = profile.blog ? `🔗 <a href="${profile.blog}" target="_blank" style="color:#388bfd">${profile.blog}</a>`
        : '';


    console.log('i am working ')
    repoList.innerHTML = repos.map(repo => `
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






function showError(message) {
    const el = document.getElementById('error');
    el.textContent = message;
    el.classList.add('visible');
}

// loading area 

let isLoading = false;

function showLoading() {
    isLoading = true;
    const loading = document.getElementById('loading');
    const profileCard = document.querySelector('#profileCard');
    const error = document.querySelector('#error');
    const searchBtn = document.getElementById('searchBtn');

    loading.classList.add('visible');
    profileCard.classList.remove('visible');
    error.classList.remove('visible');
    searchBtn.disabled = true;
}

function hideLoading() {
    isLoading = false;
    document.getElementById('loading').classList.remove('visible');
    document.getElementById('searchBtn').disabled = false;
}


let userNameInput_value = document.getElementById('usernameInput');

userNameInput_value.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') searchUser();
});
userNameInput_value.value = 'mdnaimur';
searchUser();