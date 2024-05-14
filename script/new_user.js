window.onload = function() {
    // Initially hide the password mismatch message
    document.getElementById('password-match').style.display = 'none';
    document.getElementById('username-taken').style.display = 'none';
    
    let submitButton = document.getElementById('submit');

    // Event Listener for Submit Form
    submitButton.addEventListener('click', submitForm);
}

// Submit the Form
function submitForm(event) {
    event.preventDefault();
    
    // Retrieve values from input fields
    let name = document.getElementById('user-name').value;
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let confirmPassword = document.getElementById('password-confirmation').value;
    // Get the element for displaying password mismatch message
    let passwordMatchElement = document.getElementById('password-match');
    let usernameTakenElement = document.getElementById('username-taken');

    
    // Check if passwords match
    if (password !== confirmPassword) {
        // Show the password mismatch message
        passwordMatchElement.style.display = 'block';
        return;
    }
    
    // Check username availability
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
                    // Clear form fields after successful submission
                    document.getElementById('user-name').value = '';
                    document.getElementById('username').value = '';
                    document.getElementById('password').value = '';
                    document.getElementById('password-confirmation').value = '';
                    // Hide any error messages
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
