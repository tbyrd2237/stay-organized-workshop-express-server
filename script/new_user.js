window.onload = function() {
    let submitButton = document.getElementById('submit');

    //Event Listener for Submit Form
    submitButton.addEventListener('click', submitForm);
}


//Submit the Form
function submitForm(event) {
    event.preventDefault();
    let bodyData = {
        name: document.getElementById('user-name').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }

    fetch("http://localhost:8083/api/users", {
                    method: "POST",
                    body: JSON.stringify(bodyData),
                    headers: {"Content-type":
                                "application/json; charset=UTF-8"}
                })
                    .then(response => response.json())
                    .then(json => {
                        console.log("The Post was Successful");
                });
    }

