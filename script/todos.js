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
        //Display the Data (its a list of dictionaries)
        console.log(data);
      })
}