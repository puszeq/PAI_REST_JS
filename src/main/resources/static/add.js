const studentFormAdd = document.querySelector(".student-add");
const message = document.querySelector(".message");

message.textContent = "";

function addStudent(){
    let st = {};
    st.name=document.getElementById('name').value;
    st.surname=document.getElementById('surname').value;
    st.average=document.getElementById('average').value;
    fetch("http://localhost:8080/students", {
        method: "POST",
        body: JSON.stringify(st),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => {
            if(response.ok) {
                message.textContent = "Record added.";
            }
            else {
                response.json().then(response => {
                    console.log(response)
                    message.textContent = "Sooomething went terribly wrong :(";
                })
            }
        });
}

const handleSubmitAddStudent = async e => {
    e.preventDefault();
    addStudent();
};

studentFormAdd.addEventListener("submit", e => handleSubmitAddStudent(e));