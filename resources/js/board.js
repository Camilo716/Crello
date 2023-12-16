require('./bootstrap');

const listsContainer = document.getElementById('listsContainer');
const apiUrl = 'http://127.0.0.1:8000/card-list'

function addNewList()
{
    let newList = document.createElement('div');
    newList.className = 'list';
    newList.innerHTML = '<h2> New List </h2>';
    
    listsContainer.appendChild(newList);
}

function displayExistingLists()
{
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(currentList => {
                let newList = document.createElement('div');
                newList.className = 'list';
                newList.innerHTML = `<h2>${currentList.title}</h2>`
                listsContainer.appendChild(newList);
            });
        })
        .catch(error => console.error('Error fetching lists:', error))

}


document.addEventListener('DOMContentLoaded', displayExistingLists);