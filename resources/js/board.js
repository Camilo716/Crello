require('./bootstrap');

const listsContainer = document.getElementById('listsContainer');
const addNewListButton = document.getElementById('addNewList');
const newListTitleInput = document.getElementById('title');

const apiUrl = 'http://127.0.0.1:8000/card-list'

function addNewList()
{
    const newListTitle = newListTitleInput.value; 
    fetch(apiUrl, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ title: newListTitle })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(response => {
            console.log(response["data"])
            displayLists([response["data"]]);
        })
        .catch(error => console.error('Error adding new list:', error));
}

function getExistingLists()
{
    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            displayLists(response["data"]);
        })
        .catch(error => console.error('Error fetching lists:', error))
}

function displayLists(data)
{
    data.forEach(currentList => {
        let newList = document.createElement('div');
        newList.className = 'list';
        newList.innerHTML = `<h2>${currentList.title}</h2>`
        listsContainer.appendChild(newList);
    });
}

addNewListButton.addEventListener('click', addNewList);
document.addEventListener('DOMContentLoaded', getExistingLists);