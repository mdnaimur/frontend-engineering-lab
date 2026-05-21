import { getStats } from '../utils/getStats.js';

export function renderStats() {
    const { total, done, remaining } = getStats();
    const stats = document.getElementById('stats');

    if (!stats) return;

    stats.textContent =
        total === 0
            ? 'No tasks yet, Add one above!'
            : `${remaining} remaining · ${done} of ${total} completed`;
}