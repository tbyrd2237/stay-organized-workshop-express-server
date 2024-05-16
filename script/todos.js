window.onload = function() {
    //Get the Dropdown Menu
    let dropdown = document.getElementById('dropdown-menu');

    //Add an Event Listener to the Dropdown Menu
    dropdown.addEventListener('change', fetchUserData);

    //Fetch the Users
    fetchUsers(dropdown);
}

// Function to Fetch the Users
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
//     // Get the Selected User ID
    let userId = event.target.value;

    let container = document.getElementById('container');
    container.innerHTML = '';

/// Get Request to the Todos API (based on the UserID)
fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
// Convert the response to JSON
.then(response => response.json())
// Get the data
.then(data => {
    // Loop through the data (For Each Task)
    data.forEach((task) => {
        let card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-6', 'col-sm-12'); // Bootstrap grid column classes
        card.innerHTML = `
        <div class="card mb-3" style="width: 18rem;">
        <div class="card-body front">
            <h3 class="card-title" id="header-title"><span class="star ${getPriorityArrowClass(task.priority)}">&#10095;</span>Task</h3>
            <p class="card-text" id="quote">${task.description}</p>
            <p class="card-text" id="quote-two">&#128197; Deadline:<b> ${task.deadline}</b></p>
            <button class="btn btn-secondary" id="btn-details" onclick="flipCard(this)">More Details</button>
        </div>
        <div class="card-body back" style="display: none;">
            <p class="card-text-category" id="category">Category: ${task.category}</p>
            <p class="card-text" id="priority">Priority: <span class="arrow ${getPriorityClass(task.priority)}"></span>${task.priority}</p>
            <p class="card-text" id="completed">
                    ${task.completed ? 'Completed: <span style="color: green;" class="completed-symbol">&#10003;</span>' : 'Completed: <span style="color: red;" class="not-completed-symbol">&#10008;</span>'}
            </p>
            <button class="btn btn-secondary" id="btn-more-details" onclick="flipCard(this)">Back</button>
        </div>
        </div>
    `;
        container.appendChild(card);
    });
    setEqualCardHeight();
});
}

//Function to determine priority class
function getPriorityClass(priority) {
    switch(priority) {
        case 'high':
            return 'red';
        case 'medium':
            return 'yellow';
        case 'low':
            return 'green';
        default:
            return '';
    }
}

function getPriorityArrowClass(priority) {
    switch(priority) {
        case 'High':
            console.log('high');
            return 'red-arrow';
        case 'Medium':
            console.log('medium');
            return 'yellow-arrow';
        case 'Low':
            console.log('low');
            return 'green-arrow';
        default:
            console.log('default');
            return '';
    }
}

// function fetchUserData(event) {
//     // Get the Selected User ID
//     let userId = event.target.value;

//     let container = document.getElementById('container');
//     container.innerHTML = '';

//     // Get Request to the Todos API (based on the UserID)
//     fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
//         // Convert the response to JSON
//         .then(response => response.json())
//         // Get the data
//         .then(data => {
//             // Loop through the data (For Each Task)
//             data.forEach((task) => {
//                 let card = document.createElement('div');
//                 card.classList.add('col-lg-3', 'col-md-6', 'col-sm-12'); // Bootstrap grid column classes
//                 card.innerHTML = `
//                 <div class="card mb-3" style="width: 18rem;">
//                     <div class="card-body front">
//                         <h3 class="card-title" id="header-title"><span class="star">&#10095;</span>Task</h3>
//                         <p class="card-text" id="quote">${task.description}</p>
//                         <p class="card-text" id="quote-two">&#128197; Deadline:<b> ${task.deadline}</b></p>
//                         <button class="btn btn-secondary" id="btn-details" onclick="flipCard(this)">More Details</button>
//                     </div>
//                     <div class="card-body back" style="display: none;">
//                         <p class="card-text-category" id="category">Category: ${task.category}</p>
//                         <p class="card-text" id="priority">Priority: ${task.priority}</p>
//                         <p class="card-text" id="completed">
//                             ${task.completed ? 'Completed: <span style="color: green;" class="completed-symbol">&#10003;</span>' : 'Completed: <span style="color: red;" class="not-completed-symbol">&#10008;</span>'}
//                         </p>
//                         <button class="btn btn-secondary" id="btn-more-details" onclick="flipCard(this)">Back</button>
//                     </div>
//                 </div>
//             `;
//                 container.appendChild(card);
//             });
//             setEqualCardHeight();
//         });
// }

function setEqualCardHeight() {
    // Get all cards
    let cards = document.querySelectorAll('.card');

    // Loop through each card
    cards.forEach(card => {
        // Reset card height to auto
        card.style.height = 'auto';

        // Get card front and back
        let cardFront = card.querySelector('.front');
        let cardBack = card.querySelector('.back');

        // Get the maximum height between front and back
        let maxHeight = Math.max(cardFront.offsetHeight, cardBack.offsetHeight);

        // Set the same height for both front and back
        cardFront.style.height = maxHeight + 'px';
        cardBack.style.height = maxHeight + 'px';
    });
}

// function setEqualCardHeight() {
//     // Get all card bodies
//     let cardBodies = document.querySelectorAll('.card-body');
    
//     // Loop through each row
//     cardBodies.forEach((cardBody, index, bodies) => {
//         // Get card bodies in the same row
//         let currentRowBodies = [];
//         let top = cardBody.offsetTop;
//         let height = cardBody.offsetHeight;
//         for (let i = index; i < bodies.length; i++) {
//             if (bodies[i].offsetTop === top) {
//                 currentRowBodies.push(bodies[i]);
//             }
//         }
//         // Find the maximum height in the row
//         let maxHeight = Math.max(...currentRowBodies.map(body => body.offsetHeight));
//         // Set the same height for all card bodies in the row
//         currentRowBodies.forEach(body => {
//             body.style.height = maxHeight + 'px';
//         });
//     });
// }

function flipCard(button) {
    let card = button.closest('.card');
    let cardFront = card.querySelector('.front');
    let cardBack = card.querySelector('.back');
    
    if (cardFront.style.display === 'none') {
        cardFront.style.display = 'block';
        cardBack.style.display = 'none';
    } else {
        cardFront.style.display = 'none';
        cardBack.style.display = 'block';
    }
}
