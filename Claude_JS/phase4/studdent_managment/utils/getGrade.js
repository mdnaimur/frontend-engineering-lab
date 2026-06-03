
export function getGrade(score) {

    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 60) return "C";

    return "F"
}