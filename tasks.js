// Dynamic Element Addition for Tasks Page
document.addEventListener('DOMContentLoaded', () => {
    const dynamicList = document.getElementById('dynamicList');
    const addItemButton = document.getElementById('addItemButton');
    const taskNameInput = document.getElementById('taskName');
    const taskEmailInput = document.getElementById('taskEmail');
    const taskDescriptionInput = document.getElementById('taskDescription');
    const taskUrgencySelect = document.getElementById('taskUrgency');

    function createErrorMessage(inputElement, message) {
        let errorElement = inputElement.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message text-danger mt-1';
            inputElement.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    function clearErrorMessage(inputElement) {
        const errorElement = inputElement.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }

    function validateInput(inputElement, validationFunction, errorMessage) {
        inputElement.addEventListener('blur', () => {
            if (!validationFunction(inputElement.value.trim())) {
                createErrorMessage(inputElement, errorMessage);
            } else {
                clearErrorMessage(inputElement);
            }
        });
    }

    if (taskNameInput && taskEmailInput && taskDescriptionInput && taskUrgencySelect) {
        validateInput(taskNameInput, value => value !== '', 'Câmpul Nume este obligatoriu.');
        validateInput(taskEmailInput, validateEmail, 'Adresa de email nu este validă.');
        validateInput(taskDescriptionInput, value => value !== '', 'Câmpul Descriere este obligatoriu.');
        validateInput(taskUrgencySelect, value => value !== '', 'Te rog selectează un nivel de urgență.');

        addItemButton.addEventListener('click', () => {
            const taskName = taskNameInput.value.trim();
            const taskEmail = taskEmailInput.value.trim();
            const taskDescription = taskDescriptionInput.value.trim();
            const taskUrgency = taskUrgencySelect.value;

            if (!taskName || !taskEmail || !taskDescription || !taskUrgency) {
                alert('Te rog completează toate câmpurile.');
                return;
            }

            const urgencyMapping = {
                "low": "Scăzută",
                "medium": "Medie",
                "high": "Ridicată"
            };

            const newItem = document.createElement('li');
            newItem.className = 'list-group-item';
            newItem.innerHTML = `<strong>Nume:</strong> ${taskName} <br>
                                 <strong>Email:</strong> ${taskEmail} <br>
                                 <strong>Descriere:</strong> ${taskDescription} <br>
                                 <strong>Urgenta:</strong> ${urgencyMapping[taskUrgency]}`;
            dynamicList.appendChild(newItem);

            taskNameInput.value = '';
            taskEmailInput.value = '';
            taskDescriptionInput.value = '';
            taskUrgencySelect.value = '';
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
