window.onload = function() {
    //Get the Dropdown Menu
    let dropdown = document.getElementById('dropdown-menu');
    
    //Call the Fetch the Users Function
    fetchUsers();

    //Fetch the Data for the Selected User

        
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