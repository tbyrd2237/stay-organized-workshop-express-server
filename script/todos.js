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

    //Get Request to the Todos API (based on the UserID)
    fetch(`http://localhost:8083/api/todos/byuser/${userId}`)
        //Convert the response to JSON
      .then(response => response.json())
      //Get the data
      .then(data => {
        //Loop through the data (For Each Task)
        data.forEach((task) => {
            let card = document.createElement('div');
            card.classList.add('card');
            card.style.width = '18rem';

            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            let cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = 'Task';

            let category = document.createElement('p');
            category.classList.add('card-text');
            category.textContent = "Category: " + task.category;

            let description = document.createElement('p');
            description.classList.add('card-text');
            description.textContent = "Description: " + task.description;

            let deadline = document.createElement('p');
            deadline.classList.add('card-text');
            deadline.textContent = "Deadline: " + task.deadline;

            let priority = document.createElement('p');
            priority.classList.add('card-text');
            priority.textContent = "Priority: " + task.priority;

            let completed = document.createElement('p');
            if (task.completed === true) {
                completed.innerHTML = "Completed: &#10003";
            }
            else if (task.completed === false){
                completed.innerHTML = "Completed: &#10008";
            }
            card.appendChild(completed);

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(category);
            cardBody.appendChild(description);
            cardBody.appendChild(deadline);
            cardBody.appendChild(priority);
            cardBody.appendChild(completed);

            card.appendChild(cardBody);

            let container = document.getElementById('container'); 
            container.appendChild(card);
        });


      })
}