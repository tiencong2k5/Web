class Student {
    constructor(id, name, gender, dob, hometown) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.dob = dob;
        this.hometown = hometown;
    }
}

class ManagerStudent {
    constructor() {
        this.students = JSON.parse(localStorage.getItem('students')) || [];
    }

    addStudent(student) {
        this.students.push(student);
        this.updateStorage();
        this.DisplayStudent();
    }

    editStudent(index, updateStudent) {
        this.students[index] = updateStudent;
        this.updateStorage();
        this.DisplayStudent();
    }

    deleteStudent(index) {
        this.students.splice(index, 1);
        this.updateStorage();
        this.DisplayStudent();
    }

    updateStorage() {
        localStorage.setItem('students', JSON.stringify(this.students));
    }

    DisplayStudent() {
        const studentList = document.getElementById('studentList');

        studentList.innerHTML = `
        <div class="student-header">
            <div class="student-info">Mã sinh viên</div>
            <div class="student-info">Họ tên</div>
            <div class="student-info">Giới tính</div>
            <div class="student-info">Ngày sinh</div>
            <div class="student-info">Quê quán</div>
            <div class="student-info">Hành Động</div>
        </div>`;

        this.students.forEach((student, index) => {
            const studentRow = document.createElement('div');
            studentRow.classList.add('student-row');

            studentRow.innerHTML = `
                <div class="student-info">${student.id}</div>
                <div class="student-info">${student.name}</div>
                <div class="student-info">${student.gender}</div>
                <div class="student-info">${student.dob}</div>
                <div class="student-info">${student.hometown}</div>
                <div class="student-info">
                    <button onclick="editStudent(${index})">Edit</button>
                    <button onclick="deleteStudent(${index})">Delete</button>
                </div>`;

            studentList.appendChild(studentRow);
        });
    }
}

const studentManger = new ManagerStudent();
studentManger.DisplayStudent();

document.getElementById('studentForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const id = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const dob = document.getElementById('dob').value;
    const hometown = document.getElementById('hometown').value;

    const student = new Student(id, name, gender, dob, hometown);
    studentManger.addStudent(student);

    this.reset();
});

function editStudent(index) {
    const student = studentManger.students[index];
    document.getElementById('studentId').value = student.id;
    document.getElementById('name').value = student.name;
    document.getElementById('gender').value = student.gender;
    document.getElementById('dob').value = student.dob;
    document.getElementById('hometown').value = student.hometown;

    document.getElementById('studentForm').onsubmit = function (event) {
        event.preventDefault();

        const updateStudent = new Student(
            document.getElementById('studentId').value,
            document.getElementById('name').value,
            document.getElementById('gender').value,
            document.getElementById('dob').value,
            document.getElementById('hometown').value
        );

        studentManger.editStudent(index, updateStudent);
        this.onsubmit = null;
        this.reset();
    };
}

function deleteStudent(index) {
    studentManger.deleteStudent(index);
}
