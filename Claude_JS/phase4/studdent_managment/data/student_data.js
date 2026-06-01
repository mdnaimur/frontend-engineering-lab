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
            score: score
        }

    })
}

// console.log(generateStudents(10));

export const students = generateStudents(50);