window.onload = function() {
    //Get the Dropdown Menu
    let dropdown = document.getElementById('dropdown-menu');

    //Add an Event Listener to the Dropdown Menu
    dropdown.addEventListener('change', fetchUserData);

    //Fetch the Users
    fetchUsers(dropdown);
}

//Function to Fetch the Users
function fetchUsers(dropdown) {
    //Get Request to the Users API
    fetch('http://localhost:8083/api/users')
        //Convert the response to JSON
        .then(response => response.json())
        //Get the data
        .then(data => {
            //Loop through the data
            data.forEach((user) => {
                //Create an Option Element
                let option = document.createElement('option');

                //Add Each Name to the Drop Down Menu (user.name)
                option.innerHTML = user.name;

                //Add Each ID to the Value Property (user.id)
                option.value = user.id;

                //Append the Option to the Dropdown Menu
                dropdown.appendChild(option);
            });
        });
}

function fetchUserData(event) {
    //Get the Selected User ID
    let userId = event.target.value;

    let container = document.getElementById('container');
    container.innerHTML = '';

    //Get Request to the Todos API (based on the UserID)
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
        //Convert the response to JSON
        .then(response => response.json())
        //Get the data
        .then(data => {
            //Loop through the data (For Each Task)
            data.forEach((task) => {
                let card = document.createElement('div');
                card.classList.add('col-lg-4'); // Bootstrap grid column class
                card.innerHTML = `
                    <div class="card mb-3" style="width: 18rem;">
                        <div class="card-body" style="height: 100%;">
                            <h5 class="card-title">Task</h5>
                            <p class="card-text">Category: ${task.category}</p>
                            <p class="card-text">Description: ${task.description}</p>
                            <p class="card-text">Deadline: ${task.deadline}</p>
                            <p class="card-text">Priority: ${task.priority}</p>
                            <p class="card-text">${task.completed ? "Completed: &#10003;" : "Completed: &#10008;"}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
            setEqualCardHeight();
        })
}

function setEqualCardHeight() {
    // Get all card bodies
    let cardBodies = document.querySelectorAll('.card-body');
    
    // Loop through each row
    cardBodies.forEach((cardBody, index, bodies) => {
        // Get card bodies in the same row
        let currentRowBodies = [];
        let top = cardBody.offsetTop;
        let height = cardBody.offsetHeight;
        for (let i = index; i < bodies.length; i++) {
            if (bodies[i].offsetTop === top) {
                currentRowBodies.push(bodies[i]);
            }
        }
        // Find the maximum height in the row
        let maxHeight = Math.max(...currentRowBodies.map(body => body.offsetHeight));
        // Set the same height for all card bodies in the row
        currentRowBodies.forEach(body => {
            body.style.height = maxHeight + 'px';
        });
    });
}