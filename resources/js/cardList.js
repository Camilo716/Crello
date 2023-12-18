require('./bootstrap');

const listsContainer = document.getElementById('listsContainer');
const addNewListButton = document.getElementById('addNewList');
const newListTitleInput = document.getElementById('title');

const baseApiUrl = 'http://127.0.0.1:8000/'

function addNewList()
{
    const newListTitle = newListTitleInput.value; 
    fetch(baseApiUrl+'card-list', { 
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
            displayLists([response["data"]]);
            newListTitleInput.value = '';
        })
        .catch(error => console.error('Error adding new list:', error));
}

function getExistingLists()
{
    fetch(baseApiUrl+'card-list')
        .then(response => response.json())
        .then(response => {
            displayLists(response["data"]);
        })
        .catch(error => console.error('Error fetching lists:', error))
}

function displayLists(lists)
{
    lists.forEach(currentList => {
        let newList = document.createElement('div');
        newList.className = 'list';
        newList.innerHTML = `<h2>${currentList.title}</h2>`;
        listsContainer.appendChild(newList);

        let cardsContainer = document.createElement('div');
        cardsContainer.className = 'cardsContainer';
        newList.appendChild(cardsContainer);
        fetchCardsByList(currentList["id"], cardsContainer);
    });
}

function fetchCardsByList(listId, cardsContainer)
{
    const apiUrl =  baseApiUrl+`card/get-by-list?card_list_id=${listId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            displayCards(response["data"], cardsContainer);
        })
        .catch(error => console.error('Error fetching cards:', error))
}

function displayCards(cards, cardsContainer)
{
    cards.forEach(currentCard => {
        let newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = `<h3>${currentCard.title}</h3>`
        cardsContainer.appendChild(newCard);
    });
}

addNewListButton.addEventListener('click', addNewList);
document.addEventListener('DOMContentLoaded', getExistingLists);