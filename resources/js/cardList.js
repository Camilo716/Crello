require('./bootstrap');

const listsContainer = document.getElementById('listsContainer');
const addNewListButton = document.getElementById('addNewList');
const newListTitleInput = document.getElementById('title');

const baseApiUrl = 'http://127.0.0.1:8000/'

function addNewList() {
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
            console.log(response["data"]);
            displayLists([response["data"]]);
            newListTitleInput.value = '';
        })
        .catch(error => console.error('Error adding new list:', error));
}

function addNewCard(listId) {
    const newCardTitleInput = document.getElementById(`addCardTitleInput-${listId}`);
    const newCardTitle = newCardTitleInput.value 

    fetch(baseApiUrl + 'card', { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            title: newCardTitle,
            content: "",
            card_list_id: listId
        })
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(response => {
        console.log(response.data)
        console.log(listId)
        displayCards([response.data], listId);
        newCardTitle.value = '';
    })
    .catch(error => console.error('Error adding new list:', error));
}

function getExistingLists()
{
    fetch(baseApiUrl+'card-list')
        .then(response => response.json())
        .then(response => {
            displayLists(response.data);
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

        let cardsContainerElement = document.createElement('div');
        cardsContainerElement.className = 'cardsContainer';
        cardsContainerElement.id = `cardsContainer-${currentList.id}`
        newList.appendChild(cardsContainerElement);
        fetchCardsByList(currentList.id);

        displayAddNewCardForm(currentList.id, newList);
    });
}

function fetchCardsByList(listId)
{
    const apiUrl =  baseApiUrl+`card/get-by-list?card_list_id=${listId}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(response => {
            displayCards(response.data, listId);
        })
        .catch(error => console.error('Error fetching cards:', error))
}

function displayCards(cards, parentcardContainerId)
{
    const cardsContainerElement = document.getElementById(`cardsContainer-${parentcardContainerId}`)
    cards.forEach(currentCard => {
        let newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.innerHTML = `<h3>${currentCard.title}</h3>`
        cardsContainerElement.appendChild(newCard);
    });
}

function displayAddNewCardForm(currentListId, listElement)
{
    let newCardForm = document.createElement('form');
    newCardForm.className = 'newCardForm';
    newCardForm.innerHTML = `
        <input type="text" placeholder="Enter card title..." id="addCardTitleInput-${currentListId}">
        <button class="addNewCard" type="button" id="addCardButton-${currentListId}">Add Card</button>
    `;
    listElement.appendChild(newCardForm);
    let addCardButton = document.getElementById(`addCardButton-${currentListId}`);
    addCardButton.addEventListener('click', () => addNewCard(currentListId));
}

addNewListButton.addEventListener('click', addNewList);
document.addEventListener('DOMContentLoaded', getExistingLists);