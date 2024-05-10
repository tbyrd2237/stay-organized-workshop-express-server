window.onload = function() {
    //Get the Dropdown Element for Name
    let dropdownToDos = document.getElementById('dropdown-todos');
    let submitToDoButton = document.getElementById('submit');

    //Call the Fetch Tasks Function
    fetchTasks(dropdownToDos);

    //Event Listener for Submit Form
    submitToDoButton.addEventListener('click', submitForm);
}


function fetchTasks(dropdown) {
    //Get Request to the Users API
    fetch('http://localhost:8083/api/todos') 
        //Convert the response to JSON
        .then(response => response.json())
        //Get the data
        .then(data => {
            //Loop through the data
           data.forEach((todo) => {
            //Create an Option Element
            let option = document.createElement('option');

            //Add Each Name to the Drop Down Menu (user.name)
            option.innerHTML = todo.description;
          
            //Add Each ID to the Value Property (user.id)
            option.value = todo.id;

            //Append the Option to the Dropdown Menu
            dropdown.appendChild(option);
        });
});

}

//Submit the Form
function submitForm(event) {
    event.preventDefault();

      let selectedOption = document.getElementById('dropdown-todos');
      let selectedId = selectedOption.value;

    let bodyData = {
       completed: true
    };
    
    let endpointUrl = `http://localhost:8083/api/todos/${selectedId}`;

    fetch(endpointUrl, {
        method: "PUT",
        body: JSON.stringify(bodyData),
        headers: {"Content-type":
        "application/json; charset=UTF-8"}
        })
        .then(response => response.json())
        .then(json => {
            console.log("Json: " + json);
            console.log("The Put was Sucessful");
        })
        .catch(err => {
            console.log(err);
    });

}