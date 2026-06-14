// ── STATE ────────────────────────────────────────────
const storage = {
    get(key, fallback = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : fallback;
        } catch {
            return fallback;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch {
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }
};


// Re-initialize notes after storage is defined
notes = storage.get('smart-notes', []);

function createNote(title, body, tag) {
    return {
        id: Date.now(),
        title: title.trim(),
        body: body.trim(),
        tag: tag.trim().toLowerCase(),
        createdAt: new Date().toISOString(),
    };
}

function getFilteredNotes() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const tag = document.getElementById('tagFilter').value;
    const sortBy = document.getElementById('sortBy').value;

    return [...notes]
        .filter(n =>
            (!query || n.title.toLowerCase().includes(query) || n.body.toLowerCase().includes(query)) &&
            (!tag || n.tag === tag)
        )
        .sort((a, b) => {
            if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
            if (sortBy === 'alpha') return a.title.localeCompare(b.title);
            return new Date(b.createdAt) - new Date(a.createdAt); // newest
        });
}

function getAllTags() {
    return [...new Set(notes.map(n => n.tag).filter(Boolean))].sort();
}



function formatDate(iso) {
    return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}


function saveToStorage() {
    storage.set('smart-notes', notes);
}

// ── UI ───────────────────────────────────────────────
function render() {
    renderTagFilter();
    renderNotes();
    document.getElementById('noteCount').textContent =
        `${notes.length} note${notes.length !== 1 ? 's' : ''}`;
}

function renderTagFilter() {
    const current = document.getElementById('tagFilter').value;
    const tags = getAllTags();
    document.getElementById('tagFilter').innerHTML =
        `<option value="">All tags</option>` +
        tags.map(t => `<option value="${t}" ${t === current ? 'selected' : ''}>${t}</option>`).join('');
}

function renderNotes() {
    const filtered = getFilteredNotes();
    const grid = document.getElementById('notesGrid');

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="empty">${notes.length === 0 ? 'No notes yet. Create your first one!' : 'No notes match your search.'}</div>`;
        return;
    }

    grid.innerHTML = filtered.map(note => `
      <div class="note-card" data-id="${note.id}">
        <div class="note-title">${escapeHtml(note.title) || '<em style="color:#aaa">Untitled</em>'}</div>
        <div class="note-body">${escapeHtml(note.body)}</div>
        <div class="note-footer">
          <div style="display:flex;flex-direction:column;gap:4px">
            ${note.tag ? `<span class="tag">${escapeHtml(note.tag)}</span>` : ''}
            <span class="note-date">${formatDate(note.createdAt)}</span>
          </div>
          <div class="note-actions">
            <button class="icon-btn" data-action="copy"  data-id="${note.id}" title="Copy">📋</button>
            <button class="icon-btn" data-action="edit"  data-id="${note.id}" title="Edit">✏️</button>
            <button class="icon-btn" data-action="delete" data-id="${note.id}" title="Delete">🗑️</button>
          </div>
        </div>
      </div>
    `).join('');

    // IntersectionObserver — animate cards as they enter viewport
    document.querySelectorAll('.note-card').forEach(card => {
        cardObserver.observe(card);
    });
}

function escapeHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
}

function showStatus(message, duration = 2000) {
    const bar = document.getElementById('statusBar');
    bar.textContent = message;
    bar.classList.add('show');
    setTimeout(() => bar.classList.remove('show'), duration);
}

// ── CRUD OPERATIONS ──────────────────────────────────
function saveNote() {
    const title = document.getElementById('inputTitle').value.trim();
    const body = document.getElementById('inputBody').value.trim();
    const tag = document.getElementById('inputTag').value.trim();

    if (!title && !body) {
        showStatus("Note can't be empty.");
        return;
    }

    if (editingId !== null) {
        // Update existing
        notes = notes.map(n =>
            n.id === editingId ? { ...n, title, body, tag } : n
        );
        showStatus("Note updated ✓");
    } else {
        // Create new
        notes.unshift(createNote(title, body, tag));
        showStatus("Note saved ✓");
    }

    saveToStorage();
    closeModal();
    render();
}

function deleteNote(id) {
    notes = notes.filter(n => n.id !== id);
    saveToStorage();
    showStatus("Note deleted");
    render();
}


async function copyNote(id) {
    const note = notes.find(n => n.id === id);
    if (!note) return;

    const text = [note.title, note.body].filter(Boolean).join('\n\n');
    const ok = await navigator.clipboard.writeText(text).then(() => true).catch(() => false);
    showStatus(ok ? "Copied to clipboard ✓" : "Copy failed");
}


// ── MODAL ────────────────────────────────────────────
function openModal(note = null) {
    editingId = note ? note.id : null;
    document.getElementById('modalTitle').textContent = note ? 'Edit Note' : 'New Note';
    document.getElementById('inputTitle').value = note?.title ?? '';
    document.getElementById('inputBody').value = note?.body ?? '';
    document.getElementById('inputTag').value = note?.tag ?? '';
    document.getElementById('modalBackdrop').classList.add('open');
    setTimeout(() => document.getElementById('inputTitle').focus(), 50);
}

function closeModal() {
    document.getElementById('modalBackdrop').classList.remove('open');
    editingId = null;
}

// ── EVENT DELEGATION ─────────────────────────────────
document.getElementById('notesGrid').addEventListener('click', async (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const id = parseInt(btn.dataset.id);
    const action = btn.dataset.action;

    if (action === 'delete') deleteNote(id);
    if (action === 'copy') await copyNote(id);
    if (action === 'edit') {
        const note = notes.find(n => n.id === id);
        if (note) openModal(note);
    }
});

// Close modal on backdrop click
document.getElementById('modalBackdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) closeModal();
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        openModal();
    }
});

// ── INTERSECTION OBSERVER — card entrance animation ──
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            cardObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.05 });


// ── PAGE VISIBILITY — save draft when tab hidden ─────
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        const draft = {
            title: document.getElementById('inputTitle').value,
            body: document.getElementById('inputBody').value,
            tag: document.getElementById('inputTag').value,
        };
        if (draft.title || draft.body) {
            storage.set('note-draft', draft);
        }
    }
});

// Restore draft if one exists
const savedDraft = storage.get('note-draft');
if (savedDraft?.title || savedDraft?.body) {
    openModal();
    document.getElementById('inputTitle').value = savedDraft.title ?? '';
    document.getElementById('inputBody').value = savedDraft.body ?? '';
    document.getElementById('inputTag').value = savedDraft.tag ?? '';
    storage.remove?.('note-draft');
    showStatus("Draft restored ✓");
}

// ── ONLINE / OFFLINE ─────────────────────────────────
window.addEventListener('offline', () => {
    document.getElementById('offlineBanner').classList.add('show');
});
window.addEventListener('online', () => {
    document.getElementById('offlineBanner').classList.remove('show');
    showStatus("Back online ✓");
});

// ── INIT ─────────────────────────────────────────────
render();