const studentFormUpdate = document.querySelector(".student-update");
const message = document.querySelector(".message");
const name = document.getElementById('name')
const surname = document.getElementById('surname')
const average = document.getElementById('average')

message.textContent = "";

function fillInputs(){
    name.value = sessionStorage.getItem("name");
    surname.value = sessionStorage.getItem("surname");
    average.value = sessionStorage.getItem("average");
}

function updateStudent(){
    let st = {};
    st.name=document.getElementById('name').value;
    st.surname=document.getElementById('surname').value;
    st.average=document.getElementById('average').value;

    let id = sessionStorage.getItem("updateId");

    fetch("http://localhost:8080/students/" + id, {
        method: "PUT",
        body: JSON.stringify(st),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            if(response.ok) {
                message.textContent = "Yay, record updated!";
            }
            else {
                response.json().then(response => {
                    console.log(response)
                    message.textContent = "Sooomething went terribly wrong :(";
                })
            }
        });
}

const handleSubmitUpdateStudent = async e => {
    e.preventDefault();
    updateStudent();
};

document.addEventListener('DOMContentLoaded', () => {
    fillInputs();
});

studentFormUpdate.addEventListener("submit", e => handleSubmitUpdateStudent(e));