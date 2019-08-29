const URL = '/api';

function fetchWithError(url, options) {
    return fetch(url, options)
        .then(response => {            
            if(response.ok) {
                return response.json();
            }
            else {
                return response.json().then(json => {
                    throw json.error;
                });
            }
        });
}

export function getTasks(options) {
    const showAll = options && options.showAll;
    const url = `${URL}/tasks${showAll ? '?show=all' : ''}`;
    return fetchWithError(url);
}

export function addTask(task) {
    const url = `${URL}/tasks`;
    return fetchWithError(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
}

export function updateTask(task) {
    const url = `${URL}/tasks/${task.id}`;
    return fetchWithError(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task)
    });
}

export function removeTask(id) {
    const url = `${URL}/tasks/${id}`;
    return fetchWithError(url, {
        method: 'DELETE'
    });
}

