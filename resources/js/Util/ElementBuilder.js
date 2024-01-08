export class ElementBuilder {
    static createBoardButtonElement(board) {
        let boardButtonElement = document.createElement("button");
        boardButtonElement.className = "boardButton";
        boardButtonElement.id = `boardButton-${board.id}`;

        let buttonText = document.createTextNode(board.name);
        boardButtonElement.appendChild(buttonText);

        return boardButtonElement;
    }

    static createListElement(currentList) {
        let newList = document.createElement("div");
        newList.className = "list";
        newList.innerHTML = `<h2>${currentList.title}</h2>`;
        return newList;
    }

    static createListFormElement(parentBoardId) {
        const newListForm = document.createElement("form");
        newListForm.className = "newListForm";
        newListForm.action = "POST";

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.required = true;
        titleInput.placeholder = "Enter list title...";
        titleInput.id = "title";
        titleInput.className = "formInput";

        const addListButton = document.createElement("button");
        addListButton.id = `addNewList-${parentBoardId}`;
        addListButton.className = "smallButton";
        addListButton.type = "button";
        addListButton.textContent = "Add list";

        newListForm.appendChild(titleInput);
        newListForm.appendChild(addListButton);

        return newListForm;
    }

    static createCardsContainerElement(currentListId, patchParentListFunction) {
        let cardsContainerElement = document.createElement("div");
        cardsContainerElement.className = "cardsContainer";
        cardsContainerElement.id = `cardsContainer-${currentListId}`;

        this._makeCardsContainerDroppable(
            cardsContainerElement,
            patchParentListFunction
        );

        return cardsContainerElement;
    }

    static createCardElement(currentCard) {
        let newCardElement = document.createElement("div");
        newCardElement.className = "card";
        newCardElement.id = `card-${currentCard.id}`;

        let cardTitle = document.createElement("h3");
        cardTitle.textContent = currentCard.title;
        newCardElement.appendChild(cardTitle);

        let deleteButton = document.createElement("button");
        deleteButton.className = "deleteCardButton";

        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash-alt";
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener("click", () =>
            deleteCard(currentCard.id)
        );
        newCardElement.appendChild(deleteButton);

        _makeCardDraggable(newCardElement);

        return newCardElement;
    }

    static createAddNewCardFormElement(parentListId) {
        let newCardForm = document.createElement("form");
        newCardForm.className = "newCardForm";

        newCardForm.innerHTML = `
        <input type="text" placeholder="Enter card title..." id="addCardTitleInput-${parentListId}">
        <button class="addNewCard" type="button" id="addCardButton-${parentListId}">Add Card</button>
        `;

        return newCardForm;
    }

    static createCardElement(currentCard, deleteCardFunction) {
        let newCardElement = document.createElement("div");
        newCardElement.className = "card";
        newCardElement.id = `card-${currentCard.id}`;

        let cardTitle = document.createElement("h3");
        cardTitle.textContent = currentCard.title;
        newCardElement.appendChild(cardTitle);

        let deleteButton = document.createElement("button");
        deleteButton.className = "deleteCardButton";

        let deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-trash-alt";
        deleteButton.appendChild(deleteIcon);

        deleteButton.addEventListener("click", () =>
            deleteCardFunction(currentCard.id)
        );
        newCardElement.appendChild(deleteButton);

        this._makeCardDraggable(newCardElement);

        return newCardElement;
    }

    static _makeCardDraggable(cardElement) {
        cardElement.draggable = true;

        cardElement.addEventListener("dragstart", (event) => {
            cardElement.classList.add("dragging");
            event.dataTransfer.setData("text/plain", cardElement.id);
        });

        cardElement.addEventListener("dragend", () => {
            cardElement.classList.remove("dragging");
        });
    }

    static _makeCardsContainerDroppable(
        cardContainerElement,
        patchParentListFunction
    ) {
        cardContainerElement.addEventListener("dragover", (event) => {
            event.preventDefault();
            const draggable = document.querySelector(".dragging");
            cardContainerElement.appendChild(draggable);
        });

        cardContainerElement.addEventListener("drop", (event) => {
            event.preventDefault();
            const cardId = event.dataTransfer
                .getData("text/plain")
                .split("-")[1];
            const cardContainerId = cardContainerElement.id.split("-")[1];

            patchParentListFunction(cardId, cardContainerId);
        });
    }
}
