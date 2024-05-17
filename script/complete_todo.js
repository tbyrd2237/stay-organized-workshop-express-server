window.onload = function() {
    let dropdownToDos = document.getElementById('dropdown-todos');
    let submitToDoButton = document.getElementById('submit');

    fetchTasks(dropdownToDos);

    submitToDoButton.addEventListener('click', submitForm);
}

function fetchTasks(dropdown) {
    fetch('http://localhost:8083/api/todos')
        .then(response => response.json())
        .then(data => {
            const incompleteTodos = data.filter(todo => todo.completed === false);
            incompleteTodos.forEach((todo) => {
                let option = document.createElement('option');

                option.innerHTML = todo.description;

                option.value = todo.id;

                dropdown.appendChild(option);
            });
        });
}

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
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then(response => response.json())
        .then(json => {
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
        });
}