require("./bootstrap");

import { CardClient } from "./Clients/CardClient";
import { ListClient } from "./Clients/ListClient";
import { BoardClient } from "./Clients/BoardClient";

const addNewListButton = document.getElementById("addNewList");

addNewListButton.addEventListener("click", function () {
    ListClient.addNewList(CardClient.displayAddNewCardForm);
});

document.addEventListener("DOMContentLoaded", function () {
    BoardClient.fetchBoards();
    ListClient.fetchLists(CardClient.displayAddNewCardForm);
});
