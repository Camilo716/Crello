require("./bootstrap");

import { CardClient } from "./Clients/CardClient";
import { ListClient } from "./Clients/ListClient";
import { BoardClient } from "./Clients/BoardClient";

const addNewListButton = document.getElementById("addNewList");
const addNewBoardButton = document.getElementById("addNewBoardButton");

document.addEventListener("DOMContentLoaded", function () {
    BoardClient.fetchBoards();
    ListClient.fetchLists();
});

addNewListButton.addEventListener("click", function () {
    ListClient.addNewList();
});

addNewBoardButton.addEventListener("click", function () {
    BoardClient.AddNewBoard();
});
