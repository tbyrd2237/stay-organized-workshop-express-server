window.onload = function() {
    document.getElementById('password-match').style.display = 'none';
    document.getElementById('username-taken').style.display = 'none';
    
    let submitButton = document.getElementById('submit');


    submitButton.addEventListener('click', submitForm);


    passwordMatchElement.style.display = 'none';
    usernameTakenElement.style.display = 'none';
}


function submitForm(event) {
    event.preventDefault();
    
    let name = document.getElementById('user-name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('password-confirmation').value;

    let passwordMatchElement = document.getElementById('password-match');
    let usernameTakenElement = document.getElementById('username-taken');

    
    if (password !== confirmPassword) {
        passwordMatchElement.style.display = 'block';
        return;
    }
    
    fetch(`http://localhost:8083/api/username_available/${username}`)
        .then(response => response.text())
        .then(data => {
            if (data === "NO") {
                usernameTakenElement.style.display = 'block';
            } else {
                let bodyData = {
                    name: name,
                    username: username,
                    password: password
                };

                fetch("http://localhost:8083/api/users", {
                    method: "POST",
                    body: JSON.stringify(bodyData),
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => {
                    if (response.status === 403) {
                        usernameTakenElement.style.display = 'block';
                    }
                    if (!response.ok) {
                        throw new Error("Failed to add user. Please try again later.");
                    }
              
                    document.getElementById('user-name').value = '';
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('password-confirmation').value = '';

                    passwordMatchElement.style.display = 'none';
                    usernameTakenElement.style.display = 'none';
                    return response.json();
                })
                .then(json => {
                    console.log("User added successfully.");
                })
                .catch(error => {
                    alert(error.message);
                });
            }
        })
        .catch(error => {
            console.error("Error checking username availability:", error);
        });
}
