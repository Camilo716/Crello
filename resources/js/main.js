require("./bootstrap");

import { BoardClient } from "./Clients/BoardClient";

const addNewListButton = document.getElementById("addNewList");
const addNewBoardButton = document.getElementById("addNewBoardButton");

document.addEventListener("DOMContentLoaded", function () {
    BoardClient.fetchBoards();
});

addNewBoardButton.addEventListener("click", function () {
    BoardClient.AddNewBoard();
});
