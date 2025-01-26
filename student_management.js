// Base Class Person
class Person {
    #name
    #age

    constructor (name, age) {
        this.#name = name
        this.#age = age
    }
    
    // (Encapsulation) Method used to access private properties
    getName() {
        return(this.#name)
    }

    getAge() {
        return(this.#age)
    }
}

// Student Inherited from Person
class Student extends Person{
    #studentId;
    #courses = [];
    #grades = {}

    constructor(name, age, studentId) {
        super(name, age)
        this.#studentId = studentId
    }

    getStudentId(){
        return (this.#studentId)
    }

    enrollCourse(courseName) {
        if(!this.#courses.includes(courseName)){
            this.#courses.push(courseName)
        }
    }
    calculateLetterGrade(score) {
        if(score >= 80){
            return 'A'
        } else if(score >= 70){
            return 'B'
        }else if(score >= 60){
            return 'C'
        }else if(score >= 50){
            return 'D'
        } else if(score >=40 ){
            return 'E'
        }else{
            return 'F'
        }
    }

    addGrade(courseName, score) {
        const letterGrade = this.calculateLetterGrade(score);
        this.#grades[courseName] = {
            score: score,
            letterGrade: letterGrade
        };
    }

    getAverageGrade() {
        const grades = Object.values(this.#grades);
        if (grades.length === 0) return 'No grades';
        
        let total = 0;
        grades.forEach(grade => {
            total += grade.score;
        });
        return (total / grades.length).toFixed(2);
    }

    getGradeReport() {
        const report = [];
        Object.entries(this.#grades).forEach(([course, gradeInfo]) => {
          report.push(`${course}: ${gradeInfo.score} (${gradeInfo.letterGrade})`);
        });
        return report.join('\n');
      }
      
}

// Teacher Inherited from Person
class Teacher extends Person {
    #teacherId
    #subject;
    #students = [];

    constructor(name, age, teacherId, subject) {
        super(name, age);
        this.teacherId = teacherId;
        this.#subject = subject;
    }

    assignStudent(student) {
        this.#students.push(student);
    }

    geTeacherId() {
        this.#teacherId()
    }

    getStudentCount() {
        return this.#students.length;
    }
}

class SchoolManager {
    #students = [];

    addStudent(student) {
        this.#students.push(student);
        return student;
    }

    findStudentById(studentId) {
        return this.#students.find(student => student.getStudentId() === studentId);
    }

    viewStudentDetails(studentId) {
        const student = this.findStudentById(studentId);
        if (!student) return 'Student not found';

        return {
            name: student.getName(),
            age: student.getAge(),
            studentId: student.getStudentId(),
            grades: student.getGradeReport(),
            gpa: student.getAverageGrade()
        };
    }
}

const schoolSystem = new SchoolManager();

const chinedu = new Student('Chinedu', 35, '1');

chinedu.addGrade('English', 85);
chinedu.addGrade('Biology', 92);



schoolSystem.addStudent(chinedu);

// Demonstration of functionality
console.log(schoolSystem.viewStudentDetails('1'));