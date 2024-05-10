window.onload = function() {
    //Get the Dropdown Element for Name
    let dropdownName = document.getElementById('dropdown-name');

    //Get the Dropdown Element for Category
    let dropdownCategory = document.getElementById('dropdown-category');

    let descriptionInput = document.getElementById('description-input');

    //Call the Function to Add the Data to the Name Dropdown
    fetchNames(dropdownName);

    //Call the Function to Add the Data to the Category Dropdown
    fetchCategories(dropdownCategory);

    let submitButton = document.getElementById('submit');

    //Event Listener for Name Dropdown
    dropdownName.addEventListener('change', submitForm);
    dropdownCategory.addEventListener('change', submitForm);
    submitButton.addEventListener('click', submitForm);
}

function fetchNames(dropdown) {
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

function fetchCategories(dropdownCategory) {
   //Get Request to the Category API
   fetch('http://localhost:8083/api/categories')
   //Convert the response to JSON
   .then(response => response.json())
   //Get the data
   .then(data => {
       //Loop through the data
      data.forEach((category) => {

        //Create an Option Element
        let optionCategory = document.createElement('option');

        //Add Each Name to the Drop Down Menu 
        optionCategory.innerHTML = category.name;
     
       //Add Each ID to the Value Property 
        optionCategory.value = category.name;

    //    //Append the Option to the Dropdown Menu
            dropdownCategory.appendChild(optionCategory);
   });
});

}

function fetchInput(){

}

//Submit the Form
function submitForm(event) {
    event.preventDefault();
    let bodyData = {
        userid: document.getElementById('dropdown-name').value,
        category: document.getElementById('dropdown-category').value,
        description: document.getElementById('description-input').value,
        deadline: document.getElementById('deadline').value,
        priority: document.getElementById('dropdown-priority').value,
    }

    fetch("http://localhost:8083/api/todos", {
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


