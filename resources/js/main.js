require('./bootstrap');

import { getCardApiUrl, getCardListApiUrl, getCardsByListApiUrl  } from './apiConfig';

const listsContainer = document.getElementById('listsContainer');
const addNewListButton = document.getElementById('addNewList');
const newListTitleInput = document.getElementById('title');

function addNewList() {
    let newList = {
        title: newListTitleInput.value
    }

    fetch(getCardListApiUrl(), { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newList)
    })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(response => {
            displayLists([response.data]);
            newListTitleInput.value = '';
        })
        .catch(error => console.error('Error adding new list:', error));
}

function addNewCard(listId) {
    const newCardTitleInput = document.getElementById(`addCardTitleInput-${listId}`);
    fetch(getCardApiUrl(), { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
            title: newCardTitleInput.value,
            content: "",
            card_list_id: listId
        })
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(response => {
        displayCards([response.data], listId);
        newCardTitleInput.value = '';
    })
    .catch(error => console.error('Error adding new list:', error));
}

function getExistingLists() {
    fetch(getCardListApiUrl())
        .then(response => response.json())
        .then(response => {
            displayLists(response.data);
        })
        .catch(error => console.error('Error fetching lists:', error))
}

function displayLists(lists) {
    lists.forEach(currentList => {
        let newList = _createListElement(currentList);
        listsContainer.appendChild(newList);

        let cardsContainerElement = _createCardsContainerElement(currentList.id);
        newList.appendChild(cardsContainerElement);

        fetchCardsByList(currentList.id);
        displayAddNewCardForm(currentList.id, newList);
    });
}

function fetchCardsByList(listId) {
    fetch(getCardsByListApiUrl(listId))
        .then(response => response.json())
        .then(response => {
            displayCards(response.data, listId);
        })
        .catch(error => console.error('Error fetching cards:', error))
}

function displayCards(cards, parentcardContainerId) {
    const cardsContainerElement = document.getElementById(`cardsContainer-${parentcardContainerId}`)
    cards.forEach(currentCard => {
        let newCard = _createCardElement(currentCard);
        cardsContainerElement.appendChild(newCard);
    });
}

function displayAddNewCardForm(currentListId, listElement) {
    let newCardForm =  _createAddNewCardFormElement(currentListId);
    listElement.appendChild(newCardForm);

    let addCardButton = document.getElementById(`addCardButton-${currentListId}`);
    addCardButton.addEventListener('click', () => addNewCard(currentListId));
}

function _createAddNewCardFormElement(parentListId) {
    let newCardForm = document.createElement('form');
    newCardForm.className = 'newCardForm';

    newCardForm.innerHTML = `
        <input type="text" placeholder="Enter card title..." id="addCardTitleInput-${parentListId}">
        <button class="addNewCard" type="button" id="addCardButton-${parentListId}">Add Card</button>
    `;

    return newCardForm;
}

function _createListElement(currentList) {
    let newList = document.createElement('div');
    newList.className = 'list';
    newList.innerHTML = `<h2>${currentList.title}</h2>`;
    return newList;
}

function _createCardElement(currentCard) {
    let newCard = document.createElement('div');
    newCard.className = 'card';

    let cardTitle = document.createElement('h3');
    cardTitle.textContent = currentCard.title;
    newCard.appendChild(cardTitle);

    let deleteButton = document.createElement('button');
    deleteButton.className = 'deleteCardButton';

    let deleteIcon = document.createElement('i');
    deleteIcon.className = 'fas fa-trash-alt';
    deleteButton.appendChild(deleteIcon);

    deleteButton.addEventListener('click', function() { console.log('Borrar :)')});
    newCard.appendChild(deleteButton)

    return newCard;
}

function _createCardsContainerElement(currentListId) {
    let cardsContainerElement = document.createElement('div');
    cardsContainerElement.className = 'cardsContainer';
    cardsContainerElement.id = `cardsContainer-${currentListId}`
    return cardsContainerElement;
}

addNewListButton.addEventListener('click', addNewList);
document.addEventListener('DOMContentLoaded', getExistingLists);