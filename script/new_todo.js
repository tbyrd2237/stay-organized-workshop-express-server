window.onload = function() {
    let dropdownName = document.getElementById('dropdown-name');
    let dropdownCategory = document.getElementById('dropdown-category');
    let descriptionInput = document.getElementById('description-input');
    let submitButton = document.getElementById('submit');

    fetchNames(dropdownName);
    fetchCategories(dropdownCategory);

    submitButton.addEventListener('click', submitForm);
}

function fetchNames(dropdown) {
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

function fetchCategories(dropdownCategory) {
   fetch('http://localhost:8083/api/categories')
   .then(response => response.json())
   .then(data => {
      data.forEach((category) => {
        let optionCategory = document.createElement('option');
        optionCategory.innerHTML = category.name;
        optionCategory.value = category.name;
        dropdownCategory.appendChild(optionCategory);
   });
});

}

function fetchInput(){

}

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

                        document.getElementById('todo-form').reset();
                });
    }


