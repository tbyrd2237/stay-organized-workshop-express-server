window.onload = function() {
    let dropdown = document.getElementById('dropdown-menu');
    dropdown.addEventListener('change', fetchUserData);

    fetchUsers(dropdown);
}

function fetchUsers(dropdown) {
    fetch('http://localhost:8083/api/users')
        .then(response => response.json())
        .then(data => {
            data.forEach((user) => {
                let option = document.createElement('option');
                option.innerHTML = user.name;
                option.value = user.id;

                dropdown.appendChild(option);
            });
        });
}

function fetchUserData(event) {
    let userId = event.target.value;
    let container = document.getElementById('container');
    container.innerHTML = '';


fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
.then(response => response.json())
.then(data => {
    data.forEach((task) => {
        const deadlineDate = new Date(task.deadline);      
        const formattedDate = deadlineDate.toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

        let card = document.createElement('div');
        card.classList.add('col-lg-3', 'col-md-6', 'col-sm-12'); 
        card.innerHTML = `
        <div class="card mb-3" style="width: 18rem;">
        <div class="card-body front">
            <h3 class="card-title" id="header-title"><span class="star ${getPriorityArrowClass(task.priority)}">&#10095;</span>Task</h3>
            <p class="card-text" id="quote">${task.description}</p>
            <p class="card-text" id="quote-two">&#128197;  Deadline: ${formattedDate}</p>
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

function setEqualCardHeight() {
    let cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.style.height = 'auto';

        let cardFront = card.querySelector('.front');
        let cardBack = card.querySelector('.back');

        let maxHeight = Math.max(cardFront.offsetHeight, cardBack.offsetHeight);

        cardFront.style.height = maxHeight + 'px';
        cardBack.style.height = maxHeight + 'px';
    });
}

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
