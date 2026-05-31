import { computeStats } from '../utils/computeStats.js';

function renderStats() {
    const studentAnalysis = computeStats();
    console.log("  i am data ", studentAnalysis)
    const stats = document.getElementById("stats");
    if (!stats) return;
    console.log("i am software engineer", stats);
    stats.innerHTML = `
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.total}</stat>
     <div class="stat-level">Total Students</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.average}</stat>
     <div class="stat-level">Averge Score</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.highest}</stat>
     <div class="stat-level">Highest Score</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${studentAnalysis.passing}</stat>
     <div class="stat-level">Passing</div>
    </div>
    
    `
}

export { renderStats };

