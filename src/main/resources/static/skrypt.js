const studentFormDelete = document.querySelector(".student-delete");
const studentFormUpdate = document.querySelector(".student-update");
const message = document.querySelector(".message");

message.textContent = "";

function getAllStudents() {
    fetch("http://localhost:8080/students")
        .then((response) => {
            if (response.status !== 200) {
                return Promise.reject('Whoops, something went wrong :(');
            }
            return response.json();
        })
        .then((data) => {
            pokazTabele(data);
        })
        .catch((error) => {
            console.log(error);
        });
}

function pokazTabele(response) {
    var main = document.getElementById('main');
    var content = "<table border='1'> <thead> <tr> <th> ID</th><th> Imię</th>" +
        "<th>Nazwisko</th><th>Średnia</th></tr></thead><tbody>";
    for (var st in response) {
        var id = response[st].id;
        var name = response[st].name;
        var surname = response[st].surname;
        var average = response[st].average;
        content += "<tr><td>" + id + "</td><td>" + name + "</td><td>" + surname +
            "</td><td>" + average + "</td></tr>";
    }
    content += "</tbody></table>";
    main.innerHTML = content;
}

function  deleteStudent() {

    message.textContent = "";

    let id = document.getElementById('id').value;
    fetch("http://localhost:8080/students/" + id, {
        method: "DELETE",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            if(!response.ok) {
                response.json().then(response => {
                    if(response.status !== 200) {
                        console.log(response);
                        message.textContent = "Whoops, something went wrong!";
                        return Promise.reject("Whoops, something went wrong!");
                    }});
            }
            else {
                location.reload();
            }
        })
}

const handleSubmitDeleteStudent = async e => {
    e.preventDefault();
    deleteStudent();
};

function updateStudent() {
    let updateId = document.getElementById('updateId').value;

    fetch("http://localhost:8080/students/" + updateId, {
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            if(!response.ok) {
                response.json().then(response => {
                    if(response.status !== 200) {
                        console.log(response);
                        message.textContent = "Whoops, something went wrong!";
                        return Promise.reject("Whoops, something went wrong!");
                    }});
            }
            else {
                response.json().then( response => {
                    // console.log(response)
                    sessionStorage.setItem("updateId", updateId);
                    sessionStorage.setItem("name", response.name);
                    sessionStorage.setItem("surname", response.surname);
                    sessionStorage.setItem("average", response.average);
                    window.location.href = 'http://localhost:8080/edit';
                })
            }
        })
}

const handleSubmitUpdateStudent = async e => {
    e.preventDefault();
    updateStudent();
};

document.addEventListener('DOMContentLoaded', () => {
    getAllStudents();
});

studentFormDelete.addEventListener("submit", e => handleSubmitDeleteStudent(e));

studentFormUpdate.addEventListener("submit", e => handleSubmitUpdateStudent(e));
