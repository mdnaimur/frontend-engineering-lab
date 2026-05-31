

// export const students = [
//      { id: 1, name: "Ayesha Khan", subject: "Mathematics", score: 92 },
//     { id: 2, name: "Bilal Ahmed", subject: "Physics", score: 78 },
//     { id: 3, name: "Sara Malik", subject: "Chemistry", score: 85 },
//     { id: 4, name: "Rahul Sharma", subject: "Mathematics", score: 61 },
//     { id: 5, name: "Nadia Islam", subject: "Biology", score: 47 },
//     { id: 6, name: "Tariq Hassan", subject: "Physics", score: 88 },
// ]



const names = [
    "Ayesha Khan", "Bilal Ahmed", "Sara Malik", "Rahul Sharma", "Nadia Islam",
    "Tariq Hassan", "Fatima Noor", "Imran Ali", "Zara Sheikh", "Omar Farooq",
    "Hassan Raza", "Meena Kumari", "Arif Hossain", "Nusrat Jahan", "Sabbir Rahman"
];

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English"];


function generateStudents(count = 100) {

    return Array.from({ length: count }, (_, i) => {
        const score = Math.floor(Math.random() * 51) + 50;

        return {
            id: i + 1,
            name: names[Math.floor(Math.random() * names.length)],
            subject: subjects[Math.floor(Math.random() * subjects.length)],
            score: score,

        }
    })
}

export const students = generateStudents(100);