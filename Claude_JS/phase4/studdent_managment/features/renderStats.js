import { ComputeStats } from '../utils/ComputeStats.js';


export function renderStats() {

    const StudentAnalysis = ComputeStats();


    if (!stats) return;

    stats.innerHTML = `
    <div class="stat-card">
     <stat class="value"> ${StudentAnalysis.total}</stat>
     <div class="stat-level">Total Students</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${StudentAnalysis.average}</stat>
     <div class="stat-level">Averge Score</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${StudentAnalysis.highest}</stat>
     <div class="stat-level">Highest Score</div>
    </div>

      
    <div class="stat-card">
     <stat class="value"> ${StudentAnalysis.passing}</stat>
     <div class="stat-level">Passing</div>
    </div>
    
    `

}