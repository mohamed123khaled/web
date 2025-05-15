const apiUrl = "http://localhost:3000/students";

document.addEventListener("DOMContentLoaded", () => {
    loadStudents();

    document.getElementById("student-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const subject = document.getElementById("subject").value;
        const grade = document.getElementById("grade").value;

        await fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, subject, grade })
        });

        e.target.reset();
        loadStudents();
    });
});

async function loadStudents() {
    const res = await fetch(apiUrl);
    const students = await res.json();
    const tbody = document.getElementById("student-table-body");
    tbody.innerHTML = "";

    students.forEach(student => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.subject}</td>
            <td>${student.grade}</td>
            <td>
                <button class="edit" onclick="editStudent(${student.id})">Edit</button>
                <button class="delete" onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function deleteStudent(id) {
    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    loadStudents();
}

async function editStudent(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const student = await res.json();
    document.getElementById("name").value = student.name;
    document.getElementById("subject").value = student.subject;
    document.getElementById("grade").value = student.grade;

    await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
}




















